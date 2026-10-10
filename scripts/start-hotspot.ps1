# Starts the Windows Mobile Hotspot even when the laptop has no internet,
# by sharing from the Microsoft KM-TEST Loopback Adapter instead of Wi-Fi.
# Phones join the hotspot and open http://192.168.137.1:<port>.
# Run with Windows PowerShell 5.1 (start-hotspot.bat does this for you).

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType = WindowsRuntime]
$null = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType = WindowsRuntime]
$TM = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager]

$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() |
  Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } |
  Select-Object -First 1
function Await($op, [Type]$type) {
  $task = $asTask.MakeGenericMethod($type).Invoke($null, @($op))
  $task.Wait(-1) | Out-Null
  $task.Result
}
function AwaitAction($action) {
  $m = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' } |
    Select-Object -First 1
  $m.Invoke($null, @($action)).Wait(-1) | Out-Null
}

# Pick a loopback adapter that is up, then find its connection profile.
$loopback = Get-NetAdapter | Where-Object { $_.InterfaceDescription -like 'Microsoft KM-TEST Loopback Adapter*' -and $_.Status -eq 'Up' } | Select-Object -First 1
if (-not $loopback) { throw 'No enabled "Microsoft KM-TEST Loopback Adapter" found. Add one in Device Manager > Action > Add legacy hardware.' }
$guid = $loopback.InterfaceGuid.Trim('{}')
$profile = [Windows.Networking.Connectivity.NetworkInformation]::GetConnectionProfiles() |
  Where-Object { $_.NetworkAdapter.NetworkAdapterId.ToString() -eq $guid } | Select-Object -First 1
if (-not $profile) { throw "No connection profile for $($loopback.Name)." }

$manager = $TM::CreateFromConnectionProfile($profile)
$config = $manager.GetCurrentAccessPointConfiguration()

# Keep the hotspot on when no phones are connected (Windows 11 22H2+).
try {
  if ($TM::IsNoConnectionsTimeoutEnabled()) { AwaitAction ($TM::DisableNoConnectionsTimeoutAsync()) }
} catch { Write-Warning "Could not turn off hotspot power saving: $($_.Exception.Message)" }

if ($manager.TetheringOperationalState -eq 'On') {
  Write-Host "Hotspot already on: $($config.Ssid)" -ForegroundColor Green
} else {
  Write-Host "Starting hotspot '$($config.Ssid)' via $($loopback.Name)..."
  $result = Await ($manager.StartTetheringAsync()) ([Windows.Networking.NetworkOperators.NetworkOperatorTetheringOperationResult])
  if ($result.Status -ne 'Success') { throw "Hotspot failed to start: $($result.Status) $($result.AdditionalErrorMessage)" }
  Write-Host "Hotspot is ON: $($config.Ssid)" -ForegroundColor Green
}
Write-Host "Password: $($config.Passphrase)"
$ip = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -like '192.168.137.*' } | Select-Object -First 1).IPAddress
if ($ip) { Write-Host "Phones open: http://$ip`:3000" }

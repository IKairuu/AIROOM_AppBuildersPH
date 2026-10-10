"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";

type ChatTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> & {
  value: string;
  onValueChange: (value: string) => void;
  // Tallest it grows before scrolling, in pixels.
  maxHeight?: number;
};

// A chat box that grows with what's typed. Enter sends (submits the form);
// Shift+Enter adds a new line.
const ChatTextarea = forwardRef<HTMLTextAreaElement, ChatTextareaProps>(function ChatTextarea(
  { value, onValueChange, maxHeight = 160, className = "", style, onKeyDown, ...props },
  ref,
) {
  const inner = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLTextAreaElement);

  // Fit the height to the text after every change.
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [value, maxHeight]);

  return (
    <textarea
      {...props}
      ref={inner}
      rows={1}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        // Enter sends, unless Shift is held or an input method is still composing.
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault();
          e.currentTarget.form?.requestSubmit();
        }
      }}
      style={{ maxHeight, ...style }}
      className={`resize-none overflow-y-auto ${className}`}
    />
  );
});

export default ChatTextarea;

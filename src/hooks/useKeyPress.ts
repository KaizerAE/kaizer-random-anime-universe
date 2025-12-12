import { useEffect, useState } from 'react';

/**
 * Custom hook to detect key presses
 * @param targetKey - The key to listen for (e.g., 'Enter', 'Escape')
 * @returns Boolean indicating if the target key is currently pressed
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

/**
 * Custom hook to detect keyboard shortcuts (combinations)
 * @param keys - Array of keys that must be pressed together
 * @param callback - Function to call when combination is pressed
 */
export function useKeyCombo(keys: string[], callback: () => void): void {
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const downHandler = (event: KeyboardEvent) => {
      pressedKeys.add(event.key);

      // Check if all required keys are pressed
      const allKeysPressed = keys.every(key => pressedKeys.has(key));
      if (allKeysPressed) {
        event.preventDefault();
        callback();
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keys, callback]);
}

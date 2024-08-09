import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 随机字符中打字
export function randomType(element, characters, duration, sequential = false) {
  let originalText = element.innerText;
  let textArray = originalText.split('');
  let charactersArray = characters.split('');
  let startTime = new Date().getTime();
  let interval;

  if (sequential) {
    let currentIndex = 0;
    interval = setInterval(function() {
      textArray[currentIndex] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
      element.innerText = textArray.join('');
      currentIndex++;
      if (currentIndex === textArray.length) {
        currentIndex = 0;
      }
      if (new Date().getTime() - startTime >= duration) {
        clearInterval(interval);
        element.innerText = originalText;
      }
    }, 20);
  } else {
    interval = setInterval(function() {
      for (let i = 0; i < textArray.length; i++) {
        textArray[i] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
      }
      element.innerText = textArray.join('');
      if (new Date().getTime() - startTime >= duration) {
        clearInterval(interval);
        element.innerText = originalText;
      }
    }, 0);
  }
}


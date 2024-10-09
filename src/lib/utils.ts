import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

/* Merge classNames */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Local storage control */

type TKeyLocalstorage = "accessToken" | "refreshToken" | "theme";

export const getLocalStorage = (key: TKeyLocalstorage): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: TKeyLocalstorage, value: string): void => {
  localStorage.setItem(key, value);
};

export const delLocalStorage = (...keys: TKeyLocalstorage[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

/* Date */

export const getFormattedTime = (date: string) => {
  const hours = new Date(date).getHours();
  const minute = new Date(date).getMinutes().toString().padStart(2, "0");
  return `${hours}:${minute}`;
};

/* Sharing links */

const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");

  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    toast.success("Пригласительная ссылка скопирована", {
      description: "Отправьте тому кого хотите пригласить",
    });
  } catch (err) {
    console.error(err);
    toast.error("Не удалось скопировать текст");
  }

  document.body.removeChild(textArea);
};

export const shareLink = async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);

    toast.success("Пригласительная ссылка скопирована", {
      description: "Отправьте тому кого хотите пригласить",
    });
  } catch (error) {
    unsecuredCopyToClipboard(url);
    console.log("http copy", error);
  }
};

/* Scroll utils */

export const scrollToBottom = (behavior?: "smooth" | "instant") => {
  const { body } = document;
  const bottomCords = body.scrollHeight;

  window.scrollTo({
    top: bottomCords,
    behavior: behavior || "smooth",
  });
};

export const isInDeep = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const delta = documentHeight - scrollTop - windowHeight;

  return delta < 500;
};

// formatter content
export const cutTextOnLimit = (content: string, limit: number = 30) => {
  if (content.length > limit) {
    return content.slice(0, limit + 1).trim() + "...";
  }
  return content;
};

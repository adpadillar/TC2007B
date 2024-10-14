import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        "poppins-regular": ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
        "poppins-extrabold": ["Poppins_800ExtraBold"],
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        greenBDA: "#00953b",
        lightGrayBDA: "#5c5c60",
        darkGrayBDA: "#292929",
        yellowBDA: "#f19800",
        redBDA: "#ce0e2d",
      },
    },
  },
} satisfies Config;

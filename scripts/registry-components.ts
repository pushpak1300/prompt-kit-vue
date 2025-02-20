import path from "path";
import { Schema } from "./registry-schema";

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "tailwind"
  >
> & {
  name: string;
  description: string;
  path: string;
};

export const components: ComponentDefinition[] = [
  {
    name: "prompt-input",
    description:
      "An input field designed for chat interfaces, allowing users to enter and submit text prompts to an AI model",
    path: path.join(__dirname, "../components/prompt-kit/prompt-input.tsx"),
    registryDependencies: ["textarea", "tooltip"],
  },
];

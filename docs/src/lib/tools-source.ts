import { loader } from "fumadocs-core/source";
import { tools } from "@/.source";

export const toolsSource = loader({
  baseUrl: "/tools",
  source: tools.toFumadocsSource?.() ?? tools,
});

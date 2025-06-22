import { ChatExtension } from "lib/type";

type AppContext = any;

export class PluginManager {
  private plugins: ChatExtension[] = [];

  register(plugin: ChatExtension) {
    this.plugins.push(plugin);
  }

  initializeAll(appContext: AppContext) {
    this.plugins.forEach((plugin) => plugin.initialize(appContext));
  }
}

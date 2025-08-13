/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/favorites` | `/(tabs)/nearby-buses` | `/(tabs)/nearby-stops` | `/(tabs)/routes` | `/..\hooks\useResponsive` | `/_sitemap` | `/favorites` | `/nearby-buses` | `/nearby-stops` | `/routes`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

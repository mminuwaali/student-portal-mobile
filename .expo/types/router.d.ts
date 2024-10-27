/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/account` | `/account/sign-in` | `/admission` | `/admission/` | `/admission/admission` | `/dashboard` | `/dashboard/` | `/dashboard/profile` | `/dashboard/profile/` | `/dashboard/profile/attendance` | `/dashboard/profile/password` | `/dashboard/profile/personal` | `/dashboard/profile/relative`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

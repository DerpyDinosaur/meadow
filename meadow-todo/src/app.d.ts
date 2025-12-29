import type { Session, User } from "better-auth";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    interface PageState {
      modal_create: boolean;
      modal_edit: boolean;
    }
    // interface Platform {}
  }
}

export {};

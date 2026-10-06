export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialState: ActionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};

export function failure(message: string, fieldErrors: Record<string, string> = {}): ActionState {
  return { ok: false, message, fieldErrors };
}

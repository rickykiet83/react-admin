export interface FormState<T> {
  data: T,
  submitSuccess: boolean;
  loading?: boolean;
  error?: boolean;
  message?: string;
  status?: number;
}
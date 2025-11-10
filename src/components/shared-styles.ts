import { css } from 'lit';

export const buttonStyles = css`
  button {
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
    border: none;
    font-family: inherit;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #2563eb;
  }

  .btn-primary:active:not(:disabled) {
    background: #1d4ed8;
  }

  .btn-primary:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: white;
    color: #3b82f6;
    border: 2px solid #3b82f6;
  }

  .btn-secondary:hover {
    background: #eff6ff;
    border-color: #2563eb;
  }

  .btn-secondary:active {
    background: #dbeafe;
  }

  .btn-tertiary {
    background: white;
    color: #6b7280;
    border: 1px solid #d1d5db;
  }

  .btn-tertiary:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  .btn-danger {
    background: white;
    color: #ef4444;
    border: 2px solid #ef4444;
  }

  .btn-danger:hover {
    background: #fef2f2;
    border-color: #dc2626;
  }

  button:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const formStyles = css`
  input,
  textarea,
  select {
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  input.error,
  textarea.error {
    border-color: #ef4444;
  }

  label {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
  }

  .help-text {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

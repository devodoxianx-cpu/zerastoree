import type { RequiredField } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validatePlayerFields = (
  fields: RequiredField[],
  values: Record<string, string>
): ValidationResult => {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const val = values[field.id]?.trim();

    if (field.required && (!val || val === '')) {
      errors[field.id] = `${field.label} wajib diisi.`;
      continue;
    }

    if (val && field.type === 'number') {
      if (!/^\d+$/.test(val)) {
        errors[field.id] = `${field.label} harus berupa angka tanpa spasi/simbol.`;
        continue;
      }
      if (val.length < 3) {
        errors[field.id] = `${field.label} terlalu pendek.`;
        continue;
      }
    }

    if (val && field.id === 'userId' && field.label.includes('Riot ID')) {
      if (!val.includes('#')) {
        errors[field.id] = `Riot ID harus menyertakan tanda '#' dan tagline (contoh: Nama#IND).`;
        continue;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

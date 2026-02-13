import {AjfBaseField} from './base-field';
import {AjfFieldType} from './field-type';

/**
 * An audio recording field.
 */
export interface AjfAudioField extends AjfBaseField {
  fieldType: AjfFieldType.Audio;
}

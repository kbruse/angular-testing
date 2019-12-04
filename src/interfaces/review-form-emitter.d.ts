import { FormGroup } from '@angular/forms';

export interface ReviewFormEmitter {
  targetId: number;
  isNewForm: boolean;
  formData: FormGroup;
}

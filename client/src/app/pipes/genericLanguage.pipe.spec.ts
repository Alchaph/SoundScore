import {GenericLanguagePipe} from "./genericLanguage.pipe";
import {inject} from "@angular/core";

describe('GenerictranslatePipe', () => {
  it('create an instance', () => {
    const pipe = inject(GenericLanguagePipe);
    expect(pipe).toBeTruthy();
  });
});

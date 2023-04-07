import { Pipe, PipeTransform } from '@angular/core';
import { CodebookData } from '../../data/types/Codebooks';

@Pipe({
  name: 'codebook',
  standalone: true,
})
export class CodebookPipe
  implements PipeTransform {

  transform(value: string | number, codebookData: CodebookData[]): string {
    let name = '';
    if (!codebookData) return name;
    let data = codebookData.find(data => data.id == value);
    if (data) name = data.name;
    return name;
  }

}

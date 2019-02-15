import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "formatString"})
export class FormatStringPipe implements PipeTransform {
    transform(value: string, args?: any[]): string {
        for(var key in args) {
          value = value.replace("{{" + key + "}}", args[key])
        }
        return value;
    }
}
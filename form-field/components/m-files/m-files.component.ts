import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-files',
  templateUrl: './m-files.component.html',
  styleUrls: ['./m-files.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MFilesComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MFilesComponent),
      multi: true
    }
  ]
})
export class MFilesComponent extends MBaseInput implements Validator, OnInit {
  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;

  errors: Errors | undefined;
  message = 'Nhấp để xem hoặc tải';

  constructor(
    formFieldService: FormFieldService,
    @Inject(NgxImageCompressService) private imageCompress: NgxImageCompressService,
    private sanitizer: DomSanitizer
  ) {
    super(formFieldService);
  }

  ngOnInit(): void { }

  async onChangeValue(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.value.length = 0;
      var files = event.target.files as FileDto[];

      // if (this.onlyImage == true)
      //   for (let i = 0; i < files.length; i++) {
      //     if (this.isFileImage(files[i].type) == false) {
      //       this._toastr.error('Chỉ được chọn file hình');
      //       return;
      //     }
      //   }

      for (let i = 0; i < files.length; i++) {
        var file = files[i];

        file = await this.getBase64ImageFromFile(file);

        let blob = new Blob(event.target.files, { type: file.type });
        file._url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));

        this.value.push(file);
      }

    } else {
      if (this.value.length > 0)
        this.value.length = 0;
    }

    this.handler();
  }

  get isNew() {
    return !this.value || this.value.length == 0;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = this.baseValidate(this.itemData, control.value);
    this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  getThumbnailFile(file: any) {
    if (file.type.indexOf('image') != -1) {
      return file.id ? file.fileUrl : `data:${file.type};base64,${file.data}`;
    }
    else if (file.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') != -1
      || file.type.indexOf('application/vnd.ms-excel') != -1) return '/assets/media/files/xlsx.svg';
    else if (file.type.indexOf('video/mp4') != -1) return '/assets/media/files/mp4.svg';
    else if (file.type.indexOf('audio/mp3') != -1) return '/assets/media/files/mp3.svg';
    else if (file.type.indexOf('text/plain') != -1) return '/assets/media/files/file.png';
    else if (file.type.indexOf('application/pdf') != -1) return '/assets/media/files/pdf.svg';
    else if (file.type.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') != -1) return '/assets/media/files/doc.svg';
    return '/assets/media/files/file.png';
  }

  isValidNameFile(name: string) {
    let i = name.lastIndexOf('.');
    const extension = name.substring(i, name.length);
    return name.replace(extension, '').replace(/\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\=|\{|\}|\[|\]|\\|\:|\;|\"|\'|\<|\>|\,|\.|\?|\//g, '-') + extension;
  }

  onRemoveFile(index: number, event: any) {
    event.preventDefault();

    this.value.splice(index, 1);
    this.handler();
  }

  private isFileImage(type: string) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return acceptedImageTypes.findIndex(e => e == type) > -1 ? true : false;
  }

  getBase64ImageFromFile(file: FileDto) {
    return new Promise<FileDto>((resolve, reject) => {
      let self = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.data = reader.result as string;

        if (file.type.indexOf('image') != -1)
          self.compressFile(file).then(
            result => {
              file.data = result;
              let regex = /data:([a-zA-z0-9/.\-\;]{0,})([,]{1})/gi;
              file.data = file.data.replace(regex, "");
              resolve(file);
            }
          );
        else {
          let regex = /data:([a-zA-z0-9/.\-\;]{0,})([,]{1})/gi;
          file.data = file.data?.replace(regex, "");
          resolve(file);
        }
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  private compressFile(image: any) {
    return this.imageCompress.compressFile(image.data, -1, 75, 50);
  }

  downloadFile(url: string) {
    window.open(url, "_blank");
  }
}

interface FileDto extends File {
  data: string | null;
  _url: string | SafeUrl | null;
}

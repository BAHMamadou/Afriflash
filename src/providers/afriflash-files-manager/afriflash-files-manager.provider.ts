import { Injectable } from '@angular/core';
import { from, Subject  } from 'rxjs';

@Injectable()

/**
 * Service gerant l'upload et le download des fichiers
 */
export class AfriflashFilesManagerProvider{

    private urlBlobImage = new Subject<string>();

    constructor() {}

    /**
     * Renvoie l'adresse de l'image uploader
     * @param image image
     */
    public createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.emitImageBlobUrl(reader.result);
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
        return from(this.urlBlobImage);
    }

    /**
     * Emet l'url de l'image uploadé
     * @param url url image
     */
    private emitImageBlobUrl(url: any){
        this.urlBlobImage.next(url);
        // chaque valeur emise est stocker dans le subject. Pour eviter donc d'émetre de nouveau
        // les anciennes valeurs, il faut réinitialiser le subject
        this.urlBlobImage = new Subject<string>();
    }
}

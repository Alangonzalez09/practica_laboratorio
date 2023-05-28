import { Component, OnInit } from '@angular/core';
import { UserPhoto } from '../interface/user-photo';
import { PhotoService } from '../service/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  async ionViewWillEnter(){
    await this.photoService.loadSaved();
  }  

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Borrar Foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }  

}

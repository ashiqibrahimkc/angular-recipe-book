import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
  constructor(private dataser:DataStorageService){}
 @Output()    featureselected = new EventEmitter<string>();

  onselect(feature:string){
    this.featureselected.emit(feature)
  }
  onsave(){
    this.dataser.storedata();
  }
  onfetch(){
    this.dataser.fetchdata().subscribe();
  }

}

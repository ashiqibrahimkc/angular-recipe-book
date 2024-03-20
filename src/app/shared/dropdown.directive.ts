import { Directive,HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
isopen=false;

  @HostListener('click',['$event.currentTarget']) toggleopen(target:HTMLElement){
    let ul:HTMLElement=target.querySelector('.dropdown-menu');
    this.isopen=!this.isopen

    if(this.isopen){
      this.renderer.addClass(ul,'show')
    }else{
      this.renderer.removeClass(ul,'show')
    }
  }
  constructor( private renderer:Renderer2) { }

}

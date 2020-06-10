import { Component } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  bodyLoading: boolean;

  constructor(private loader: LoadingService) { }

  ngOnInit() {
    this.loader.bodyLoading.subscribe(status => {
      this.bodyLoading = status;
    });
  }
}

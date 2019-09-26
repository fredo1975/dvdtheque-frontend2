import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilmService } from '../film.service';
import { FormGroup } from '@angular/forms';
import * as Stomp from 'stompjs';
import { Message } from 'stompjs';
import { environment } from '../../environments/environment';
import { MessagingService } from './../messaging.service';
import { StompState } from '@stomp/ng2-stompjs';
import { JmsStatusMessage } from '../jms-status-message';

@Component({
  selector: 'app-film-import',
  templateUrl: './film-import.component.html',
  styleUrls: ['./film-import.component.css']
})
export class FilmImportComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') inputEl: ElementRef;
  loading = false;
  loadingStatus = false;
  buttonDisabled = false;
  exportResult: any;
  formdata: FormData;
  form: FormGroup;
  private TOPIC = '/topic/*';
  private stompClient: Stomp;
  private messagingService: MessagingService;
  messageHistory: JmsStatusMessage<any>[];
  state = 'NOT CONNECTED';

  constructor(private filmService: FilmService) {
    this.messageHistory = [];
  }
  ngOnInit() {
    this.initializeWebSocketConnection();
    this.subscribeTopic();
  }
  ngOnDestroy() {
    this.messagingService.disconnect();
  }
  importFilmList() {
    console.log('importFilmList');
    this.buttonDisabled = true;
    this.loading = true;
    this.loadingStatus = true;
    this.messageHistory = [];
    this.filmService.importFilmList(this.formdata).subscribe((data: any) => {
      console.log(data);
    }
      , (error) => {
        console.log(error);
        this.buttonDisabled = false;
        this.loading = false;
        this.loadingStatus = false;
      }
      , () => {
        this.buttonDisabled = false;
        this.loading = false;
      });
  }

  private subscribeTopic() {
    // Subscribe to its stream (to listen on messages)
    this.messagingService.stream().subscribe((message: Message) => {
      console.log('JSON.parse(message.body)=', JSON.parse(message.body));
      const jmsStatusMessage: JmsStatusMessage<any> = JmsStatusMessage.fromJson(JSON.parse(message.body));
      console.log('jmsStatusFilm=', jmsStatusMessage);
      this.messageHistory.unshift(jmsStatusMessage);
      this.loadingStatus = true;
    });
  }

  loadFile(event) {
    console.log('loadFile event', event);
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const fileCount: number = inputEl.files.length;
    console.log('loadFile event', fileCount);
    if (fileCount === 1) {
      console.log('loadFile inputEl.files.item(i)=', inputEl.files.item(0));
      this.formdata = new FormData();
      this.formdata.append('file', inputEl.files.item(0));
    }
  }
  private initializeWebSocketConnection() {
    // Instantiate a messagingService
    this.messagingService = new MessagingService(environment.websocketApiUrl, this.TOPIC);
    // Subscribe to its state (to know its connected or not)
    this.messagingService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
      console.log('this.state=', this.state);
    });
  }
}

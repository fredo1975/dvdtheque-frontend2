import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilmService } from '../film.service';
import { FormGroup } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
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
  messageHistory: JmsStatusMessage<any>[] = [];
  state = 'NOT CONNECTED';


  constructor(private filmService: FilmService) {
  }
  ngOnInit() {
    this.loadingStatus = false;
    this.initializeWebSocketConnection();
  }
  ngOnDestroy() {
    this.messagingService.disconnect();
  }
  importFilmList() {
    console.log('importFilmList');
    this.buttonDisabled = true;
    this.loading = true;
    this.loadingStatus = true;
    this.filmService.importFilmList(this.formdata).subscribe((data: any) => {
      console.log(data);
    }
      , (error) => {
        console.log(error);
        this.buttonDisabled = false;
        this.loading = false;
      }
      , () => {
        this.buttonDisabled = false;
        this.loading = false;
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
    // Subscribe to its stream (to listen on messages)
    this.messagingService.stream().subscribe((message: Message) => {
      console.log('JSON.parse(message.body)=', JSON.parse(message.body));
      const jmsStatusMessage: JmsStatusMessage<any> = JmsStatusMessage.fromJson(JSON.parse(message.body));
      console.log('jmsStatusFilm=', jmsStatusMessage);
      this.messageHistory.unshift(jmsStatusMessage);
    });

    // Subscribe to its state (to know its connected or not)
    this.messagingService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
      console.log('this.state=', this.state);
    });
  }

  /*
    private initializeWebSocketConnection() {
      const ws = new SockJS(environment.websocketApiUrl);
      this.stompClient = Stomp.over(ws);
      const that = this;
      that.stompClient.connect({}, function (frame) {
        that.stompClient.subscribe(this.TOPIC, (message: Message) => {
          console.log('message.body', message.body);
          console.log('JSON.stringify(message.body)', JSON.stringify(message.body));
        }, console.log('error while subscribing'));
      }, this.errorCallBack);
    }
    private errorCallBack(error) {
      console.log('errorCallBack -> ' + error);
      setTimeout(() => {
        this.initializeWebSocketConnection();
      }, 5000);
    }*/
}

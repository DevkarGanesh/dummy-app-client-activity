import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const window: any;

export interface LogEntry {
  time: string;
  type: string;
  detail: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ISG Travel — Booking Portal';

  /** Live feed of analytics events fired in this session */
  eventLog: LogEntry[] = [];

  /** Dummy sessionStorage values shown in the debug panel */
  sessionData: { key: string; value: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ── Display sessionStorage values in debug panel ───────────────────────
    const ssKeys = [
      'account_name', 'account_code', 'booking_no',
      'quote_no', 'itinerary_no', 'itinerary_name'
    ];
    this.sessionData = ssKeys.map(k => ({
      key: k,
      value: sessionStorage.getItem(k) || '—'
    }));

    // ── Log route_change events in the UI event feed ───────────────────────
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => this.addLog('route_change', e.url));

    // ── Log initial page_view ──────────────────────────────────────────────
    this.addLog('page_view', window.location.pathname || '/');
  }

  addLog(type: string, detail: string): void {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    this.eventLog.unshift({ time, type, detail });
    if (this.eventLog.length > 50) this.eventLog.pop();
  }
}

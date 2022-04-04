import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ListControl } from './../model/memo';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public Share: ListControl = {
    SelectedRow: 0,
    PageIndex: 0,
    PageSize: 1000,
    SortActive: 'id',
    SortDirection: 'asc',
    Data: ([] = []),
  };
  public host = 'https://memoapi.us-south.cf.appdomain.cloud';

  /**
   * コンストラクタ. MemoService のインスタンスを生成する
   */
  constructor(private http: HttpClient) {}

  public getNoteList(): Observable<HttpResponse<any>> {
    return this.http.get(this.host + '/api/note', this.httpOptions).pipe(
      tap((_) => this.log('getNoteList')),
      catchError(this.handleError<any>('getNoteList'))
    );
  }

  /** IDによりメモを取得する */
  public getNote(id: any): Observable<any> {
    return this.http
      .get(this.host + '/api/note/memos/' + id, this.httpOptions)
      .pipe(
        tap((_) => this.log('getNote')),
        catchError(this.handleError<any>('getNote'))
      );
  }

  /** POST: サーバーに新しいメモを登録する */
  public addNote(note: any): Observable<any> {
    return this.http
      .post(this.host + '/api/note/memos', note, this.httpOptions)
      .pipe(
        tap((_) => this.log('addNote')),
        catchError(this.handleError<any>('addNote'))
      );
  }

  /** PUT: サーバー上でメモを更新 */
  public updNote(id: any, note: any): Observable<any> {
    return this.http
      .put(this.host + '/api/note/memos/' + id, note, this.httpOptions)
      .pipe(
        tap((_) => this.log('updNote')),
        catchError(this.handleError<any>('updNote '))
      );
  }

  /** DELETE: サーバーからメモを削除 */
  public delNote(id: any): Observable<any> {
    return this.http
      .delete(this.host + '/api/note/memos/' + id, this.httpOptions)
      .pipe(
        tap((_) => this.log('delNote')),
        catchError(this.handleError<any>('delMemo'))
      );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** log記録 HeroServiceのメッセージをMessageServiceを使って */
  private log(message: string) {
    console.log(message); // かわりにconsoleに出力
  }
}

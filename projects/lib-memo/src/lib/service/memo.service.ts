import { ListControl } from './../model/memo';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemoService {
  /**
   * Http クライアントを実行する際のヘッダオプション
   *
   * @description
   * 認証トークンを使用するために `httpOptions` としてオブジェクトを用意した。
   */

  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private ListMemo: any[] = [];
  public get listMemo(): any[] {
    return this.ListMemo;
  }
  public set listMemo(value: any[]) {
    this.ListMemo = value;
  }

  private editId: any;
  public get EditId(): any {
    return this.editId;
  }
  public set EditId(value: any) {
    this.editId = value;
  }
  public Share: ListControl = {
    SelectedRow: 0,
    PageIndex: 0,
    PageSize: 10,
    SortAactive: 'id',
    SortDirection: 'asc',
    Data: ([] = []),
  };

  /**
   * RST-API 実行時に指定する URL
   * バックエンドは Express で実装し、ポート番号「3000」
   */
  // デバッグ用 - CORS エラーを回避する場合、フロントエンドのポート番号「4200」を指定
  // ビルド確認 - private host: string = 'http://localhost:3000';
  // リリース用 - private host: string = 'https://memo-apl.mybluemix.net';
  // Web APIのURL -
  // ビルド確認 -
  // private host = 'https://memo-apl.mybluemix.net';
  public host = 'https://memoapi.us-south.cf.appdomain.cloud';
  // private host = 'http://localhost:3000';

  /**
   * コンストラクタ. MemoService のインスタンスを生成する　* Httpサービスを DI
   */
  constructor(private http: HttpClient) {}

  /**
   * initialLoad HTTP GET メソッドを実行する
   */
  public initialLoad() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.host + '/api', this.httpOptions)
        .toPromise()
        .then(
          (res: any) => {
            // Success
            const list: any = res.message.list.map(
              (x: { value: any }) => x.value
            );
            this.ListMemo = list;
            resolve(true);
          },
          (err) => {
            // Error
            console.log('err=' + JSON.stringify(err));
            reject(err);
          }
        );
    });
  }

  /**
   * HTTP GET メソッドを実行する
   */
  public get(callback: any) {
    this.http.get(this.host + '/api', this.httpOptions).subscribe(
      (res: any) => {
        // const response: any = res;
        const list = res.message.list;
        this.ListMemo = list.map((x: { value: any }) => x.value);
        // callback(response);
        callback(this.ListMemo);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public getMemoList(): Observable<HttpResponse<any>> {
    // return this.http.get(this.host + '/api', { observe: 'response' }).pipe(
    return this.http.get(this.host + '/api', this.httpOptions).pipe(
      tap((_) => this.log('getMemoList')),
      catchError(this.handleError<any>('getMemoList'))
    );
  }
  /** IDによりメモを取得する */
  public getMemo(id: any): Observable<any> {
    return this.http.get(this.host + '/api/memos/' + id, this.httpOptions).pipe(
      tap((_) => this.log('getMemo')),
      catchError(this.handleError<any>('getMemo'))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいメモを登録する */
  public addMemo(memo: any): Observable<any> {
    return this.http
      .post(this.host + '/api/memos', memo, this.httpOptions)
      .pipe(
        tap((_) => this.log('addMemo')),
        catchError(this.handleError<any>('addMemo'))
      );
  }

  /** PUT: サーバー上でメモを更新 */
  public updMemo(id: any, memo: any): Observable<any> {
    return this.http
      .put(this.host + '/api/memos/' + id, memo, this.httpOptions)
      .pipe(
        tap((_) => this.log('updMemo')),
        catchError(this.handleError<any>('updMemo '))
      );
  }

  /** DELETE: サーバーからメモを削除 */
  public delMemo(id: any): Observable<any> {
    return this.http
      .delete(this.host + '/api/memos/' + id, this.httpOptions)
      .pipe(
        tap((_) => this.log('delMemo')),
        catchError(this.handleError<any>('delMemo'))
      );
  }

  /** post: サーバーにDBデータ管理を依頼する */
  public DBman(func: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .get(this.host + '/api/dbman/' + func, { headers, responseType: 'blob' })
      .pipe(
        tap((_) => this.log('DBman func=' + func)),
        catchError(this.handleError<any>('DBman err func=' + func))
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

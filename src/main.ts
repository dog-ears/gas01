function myFunction(): void {
  // スクリプトプロパティを取得
  const scriptProperties = PropertiesService.getScriptProperties();
  const envName = scriptProperties.getProperty('ENV_NAME');
  const spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');

  console.log(`現在の環境: ${envName}`);
  console.log(`使用するスプレッドシートID: ${spreadsheetId}`);

  if (!envName || !spreadsheetId) {
    console.warn('警告: スクリプトプロパティが設定されていません。プロジェクトの設定から追加してください。');
  }
}


export const exportCSV = (rows, filename='data') => {
  if(!rows?.length) return;
  const header = Object.keys(rows[0]);
  const csv = [header.join(',')].concat(rows.map(r => header.map(k => r[k]).join(','))).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
};

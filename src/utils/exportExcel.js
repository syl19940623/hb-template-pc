import axios from 'axios'

export function exportExcel(name = '统计报表', url, data) {
  axios({
    method: 'post',
    url: '/template_api/' + url,
    headers: {
      authorization: window.parent.getToken()
    },
    data,
    responseType: 'blob'
  }).then(res => {
    const aLink = document.createElement('a')
    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
    aLink.style.display = 'none'
    aLink.href = URL.createObjectURL(blob)
    aLink.setAttribute('download', name + '.xlsx')
    document.body.appendChild(aLink)
    aLink.click()
    document.body.removeChild(aLink)
  })
}
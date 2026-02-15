$ports = 3000,3001,3002
foreach ($p in $ports) {
  try {
    $c = Get-NetTCPConnection -LocalPort $p -ErrorAction Stop
    $pid = $c.OwningProcess
    Write-Output "Stopping process on port $p (PID $pid)"
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
  } catch {
    Write-Output "No process on port $p"
  }
}

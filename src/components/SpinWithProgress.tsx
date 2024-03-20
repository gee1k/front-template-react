import CircularProgress from '@mui/joy/CircularProgress'

export default function SpinWithProgress() {
  return (
    <div className="absolute grid h-full w-full place-items-center">
      <CircularProgress size="lg" />
    </div>
  )
}

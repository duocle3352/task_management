interface Props {
  children: JSX.Element
}

function DefaultLayout({ children }: Props) {
  return (
    <div>
      DefaultLayout
      {children}
    </div>
  )
}

export default DefaultLayout

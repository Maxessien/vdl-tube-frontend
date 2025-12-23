import Search from './Search'

const Home = () => {
  return (
    <>
    <main className='h-screen w-screen mx-auto max-w-lg px-3 flex flex-col justify-center gap-4'>
        <h1 className='text-3xl text-(--text-primary) w-full text-center font-semibold'>Tube VDL</h1>
        <Search />
    </main>
    </>
  )
}

export default Home
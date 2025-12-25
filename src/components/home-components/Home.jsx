import Search from './Search'

const Home = () => {
  return (
    <>
    <main className='h-screen w-screen mx-auto max-w-lg px-2 flex flex-col justify-center items-start pt-20 gap-4'>
        <h1 className='text-3xl text-(--text-primary) w-full text-center font-semibold'>Tube VDL</h1>
        <Search />
    </main>
    </>
  )
}

export default Home
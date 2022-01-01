import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

type RecipeProps = {
  text: string,
}

/**
 * A recipe in the listing
 * @param param
 * @returns 
 */
const Recipe = ({ text }: RecipeProps) => {
  return <div className='border-gray-700 border flex flex-col justify-items-center gap-y-3 rounded-xl p-5 bg-gradient-to-b from-gray-100 to-transparent'>
    <img src="pie.jpg" width={200} height={200}/>
    <p className='text-xl text-center'>{text}</p>
  </div>
}

const RecipeListing = () => {

  return (
    <div className='flex flex-col items-center gap-y-1'>
      <Recipe text="First recipe" />
      <Recipe text="Recipe 2" />

    </div>
  )
}

const RecipeListPage: NextPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-6xl font-normal leading-normal mt-0 mb-5">What to eat next?</h1>
      <RecipeListing />
    </div>
  )
}

export default RecipeListPage

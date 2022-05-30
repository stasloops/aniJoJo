import axios from 'axios'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import style from '../../styles/searchOptions.module.scss'
import { AnimeProps, KodikProps } from '../../type/type'

type SearchOptionsProps = {
  value: string
  setValue: (value: string) => void
}

const SearchOptions: FC<SearchOptionsProps> = ({ value, setValue }) => {
  const [response, setResponse] = useState<AnimeProps[]>([])
  const [options, setOptions] = useState<any[]>([])
  const router = useRouter()

  const getOptions = async () => {
    const res = await axios.get<KodikProps>(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&title=${value}&types=anime-serial,anime&with_material_data=true`)
    setResponse(res.data.results)
  }

  useEffect(() => {
    if (value) {
      getOptions()
    }
  }, [value])

  useEffect(() => {
    let addMap: any = new Map();
    response.forEach((p: AnimeProps) => addMap.set(p.worldart_link, p));
    setOptions([...addMap.values()])
  }, [response])

  const onNavigateSearch = (option: React.MouseEvent<HTMLLIElement>) => {
    if (value.length > 0) {
      router.push(`/search/${option}`)
      setValue('')
    }
  }
  setTimeout(() => {
    console.log('render');
  })

  return (
    <div style={{ display: options.length === 0 ? 'none' : value ? '' : 'none' }} className={style.options}>
      <ul className={style.options__items}>
        {
          options?.map((item, id) => (
            <li onClick={() => onNavigateSearch(item.material_data?.anime_title)} key={id} className={style.options__item}>
              {item.material_data?.anime_title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SearchOptions
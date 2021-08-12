import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import React from 'react';
import Tab2Content, { tab2util } from '../components/Tab2Content'

Enzyme.configure({ adapter: new Adapter() });

let data = {
    ad: "asdasd",
    soyad: "asd",
    fistarihi: "2021-01-01T00:00:00.000Z",
    fistutari: 35.4,
    tarih: "2021-01-01"
}


describe('Tab2Content', () => {


    it('Bilgilerin Getirilmesi', () => {

        const wrapper = shallow(<Tab2Content data={data} tarih={data.tarih} />)


        expect(wrapper.text().includes('asdasd')).toBe(true)
        expect(wrapper.text().includes('asd')).toBe(true)
        expect(wrapper.text().includes('2021-01-01')).toBe(true)
        expect(wrapper.text().includes('35.4')).toBe(true)

    })


    it('Modalin gosterilmesi', () => {

        tab2util.isInvalid = jest.fn()
        const wrapper = mount(<Tab2Content data={data} tarih={data.tarih} />)

        console.log(wrapper.debug())

        wrapper.find('input').at(2).simulate('change', { target: { value: 'asdasd' } })
        wrapper.find('input').at(3).simulate('change', { target: { value: '1111222233334444' } })
        wrapper.find('input').at(4).simulate('change', { target: { value: 333 } })
        wrapper.find('select').at(0).simulate('change', { target: { value: 1 } })
        wrapper.find('select').at(1).simulate('change', { target: { value: 2023 } })

        wrapper.find('button').at(0).simulate('click', { preventDefault() {} })



        expect(wrapper.text().includes('asdasd')).toBe(true)
        expect(wrapper.text().includes('asd')).toBe(true)
        expect(wrapper.text().includes('2021-01-01')).toBe(true)
        expect(wrapper.text().includes('35.4')).toBe(true)

    })

    





})
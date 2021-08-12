import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import Tab3Content from '../components/Tab3Content'

Enzyme.configure({ adapter: new Adapter() });

describe('Tab3Content', () => {



    var data = {
        "hesapNo": 1234512345123,
        "kurum": 'Su',
        "idkisi": '32452124522',
        "fatura": 35.2,
        "tahsilatTutari": 35.2,
        "durum": "Ödendi",
        "adi": 'Su',
        "fiskodu": 'AAAAAAAAAA'

    }

    it('Bilgileri denetleme', () => {

        const wrapper = shallow(<Tab3Content data={data} hesapNo={data.hesapNo} />)

        expect(wrapper.text().includes('1234512345123')).toBe(true)
        expect(wrapper.text().includes('Su')).toBe(true)
        expect(wrapper.text().includes('AAAAAAAAAA')).toBe(true)
        expect(wrapper.text().includes('32452124522')).toBe(true)

    })


})
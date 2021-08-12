import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import Tab1Content from '../components/Tab1Content'

Enzyme.configure({ adapter: new Adapter() });

let values = ['Aydın', 'İzmir', 'İstanbul', 'Ankara']


describe('Tab1Content', () => {

    it('Dropdown sayısı kontrolü', () => {
        const wrapper = shallow(<Tab1Content values={values} />)

        expect(wrapper.find('select').length).toBe(2)

    })

    it('3. dropdownun getirilmesi - ASGİ', () => {

        const wrapper = shallow(<Tab1Content values={values} />)
        wrapper.find('#sehirler').simulate('change', { target: { value: 'İstanbul' } });
        wrapper.find('#kurumlar').simulate('change', { target: { value: 'Dogalgaz' } });


        expect(wrapper.find({ name: 'combt' }).length).toBe(1)

    })

    it('3. dropdownun getirilmesi - ANKARA', () => {

        const wrapper = shallow(<Tab1Content values={values} />)
        wrapper.find('#sehirler').simulate('change', { target: { value: 'Ankara' } });
        wrapper.find('#kurumlar').simulate('change', { target: { value: 'Su' } });


        expect(wrapper.find({ name: 'combt' }).length).toBe(1)

    })
    


})
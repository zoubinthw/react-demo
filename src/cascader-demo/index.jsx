import { useState } from "react";

import { useEffect } from "react";

import data from "./data/mask_data";


const oss = data();
// const oss = [
//     {name: 'widows', comps: [{name: 'tencent', softs: [{name: 'qq'}, {name: 'wechat'}, {name: 'wegame'}]}, {name: '360', softs: [{name: '360defend'}, {name: '360zip'}]}]}, 
//     {name: 'linux', comps: [{name: 'tencent1', softs: [{name: 'qq1'}, {name: 'wechat1'}, {name: 'wegame1'}]}, {name: '3601', softs: [{name: '360defend1'}, {name: '360zip1'}]}]}, 
//     {name: 'mac', comps: [{name: 'tencent2', softs: [{name: 'qq2'}, {name: 'wechat2'}, {name: 'wegame2'}]}, {name: '3602', softs: [{name: '360defend2'}, {name: '360zip2'}]}]}, 
// ];

// 有没有一种可能: 在系统A->siteP -> {a, b}, 系统B -> siteP -> {a, b, c}
// const oss = [
//     {name: 'widows', comps: [{name: 'tencent', softs: [{name: 'qq'}, {name: 'wechat'}, {name: 'wegame'}]}, {name: '360', softs: [{name: '360defend'}, {name: '360zip'}]}, {name: 'xunlei', softs: [{name: 'xunleiDownload'}, {name: 'xunleiPlay'}]}]}, 
//     {name: 'linux', comps: [{name: 'tencent', softs: [{name: 'qq'}, {name: 'wechat'}, {name: 'wegame'}]}, {name: '360', softs: [{name: '360defend'}, {name: '360zip'}]}]}, 
//     {name: 'mac', comps: [{name: 'adobe', softs: [{name: 'adobe_pdf'}, {name: 'adobe_video'}, {name: 'adobe_photo'}]}, {name: '360', softs: [{name: '360defend'}, {name: '360zip'}]}]}, 
// ];

export default function Cascader() {
    const [lv1, setLv1] = useState([]);
    const [lv1Value, setLv1Value] = useState('');
    const [lv2, setLv2] = useState([]);
    const [lv2Value, setLv2Value] = useState('');
    const [lv3, setLv3] = useState([]);
    const [lv3Value, setLv3Value] = useState('');

    const operations = [];
    const companys = new Map(); // key是op, value是 comp名字数组
    const softs = new Map(); // key 是comp名字, value是

    for(const op of oss) {
        operations.push(op.name);
        const cmps = [''];
        for(const comp of op.comps) {
            cmps.push(comp.name);
            const sfs = [''];
            for(const soft of comp.softs) {
                sfs.push(soft.name)
            }
            softs.set(comp.name, sfs);
        }
        companys.set(op.name, cmps);
    }

    useEffect(() => {
        const l1 = operations.map((name, index) => <option key={index}>{name}</option>)
        setLv1(l1)
        setLv1Value(operations[0]);
        const lv2List = companys.get(operations[0]).map((name, index) => <option key={index+1}>{name}</option>);
        setLv2(lv2List);
        setLv2Value(companys.get(operations[0])[0]);
    }, []);

    const handleChangeOp = (event) => {
        setLv1Value(event.target.value);
        const lv2List = companys.get(event.target.value).map((name, index) => <option key={index+1}>{name}</option>);
        setLv2(lv2List);
        setLv2Value('')
        setLv3([]);
        setLv3Value('');
    }

    const handleChangeComp = (event) => {
        setLv2Value(event.target.value);
        if(event.target.value) {
            const lv3List = softs.get(event.target.value).map((name, index) => <option key={index}>{name}</option>);
            setLv3(lv3List);
            setLv3Value('');
        } else {
            setLv3([]);
            setLv3Value('');
        }
    }

    const handleChangeSoft = (event) => {
        setLv3Value(event.target.value);
    }

    const submit = () => {
        console.log('lv1Value: ' + lv1Value);
        console.log('lv2Value: ' + lv2Value);
        console.log('lv3Value: ' + lv3Value);
    }

    return (
        <div>
            {/* 初始选项为空, 其value类型为string */}
            <select value={lv1Value} onChange={handleChangeOp}>{lv1}</select>
            <select value={lv2Value} onChange={handleChangeComp}>{lv2}</select>
            <select value={lv3Value} onChange={handleChangeSoft}>{lv3}</select>
            <button type="button" onClick={submit}>提交</button>
            <div>demo</div>
        </div>
    )
}
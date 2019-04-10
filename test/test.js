var assert = require('assert');
var app = require('../slcsp.js')
const _=require('lodash');

var GAplans = [ { plan_id: '77215MO4993616',
    state: 'GA',
    metal_level: 'Silver',
    rate: '99.53',
    rate_area: '6' },
    { plan_id: '66485LN1088133',
        state: 'GA',
        metal_level: 'Silver',
        rate: '306.07',
        rate_area: '6' },
    { plan_id: '91897XI8290484',
        state: 'GA',
        metal_level: 'Silver',
        rate: '296.75',
        rate_area: '6' },
    { plan_id: '56582GL7202363',
        state: 'GA',
        metal_level: 'Silver',
        rate: '364.99',
        rate_area: '6' },
    { plan_id: '25597GZ9821670',
        state: 'GA',
        metal_level: 'Silver',
        rate: '344.01',
        rate_area: '6' },
    { plan_id: '80488QN0452279',
        state: 'GA',
        metal_level: 'Silver',
        rate: '290.6',
        rate_area: '6' },
    { plan_id: '21738UF7871319',
        state: 'GA',
        metal_level: 'Silver',
        rate: '476.93',
        rate_area: '6' },
    { plan_id: '64749BM2933507',
        state: 'GA',
        metal_level: 'Silver',
        rate: '373.49',
        rate_area: '6' },
    { plan_id: '87500DC9394558',
        state: 'GA',
        metal_level: 'Silver',
        rate: '362.92',
        rate_area: '6' },
    { plan_id: '96977HV1485661',
        state: 'GA',
        metal_level: 'Silver',
        rate: '335.81',
        rate_area: '6' },
    { plan_id: '13272WJ1253728',
        state: 'GA',
        metal_level: 'Silver',
        rate: '464.35',
        rate_area: '6' },
    { plan_id: '49619UH2692176',
        state: 'GA',
        metal_level: 'Silver',
        rate: '368.31',
        rate_area: '6' },
    { plan_id: '84462JD4057490',
        state: 'GA',
        metal_level: 'Silver',
        rate: '333.06',
        rate_area: '6' },
    { plan_id: '08974YA6298513',
        state: 'GA',
        metal_level: 'Silver',
        rate: '354.59',
        rate_area: '6' } ]

var KSPlans = [ { plan_id: '24136DT6341333',
    state: 'KS',
    metal_level: 'Silver',
    rate: '224.31',
    rate_area: '6' },
  { plan_id: '73933HS6388428',
    state: 'KS',
    metal_level: 'Silver',
    rate: '236.85',
    rate_area: '6' },
  { plan_id: '22914KH3561750',
    state: 'KS',
    metal_level: 'Silver',
    rate: '232.91',
    rate_area: '6' },
  { plan_id: '83438MQ6743054',
    state: 'KS',
    metal_level: 'Silver',
    rate: '236.24',
    rate_area: '6' },
  { plan_id: '28193UU0623361',
    state: 'KS',
    metal_level: 'Silver',
    rate: '227.52',
    rate_area: '6' },
  { plan_id: '56834OY7425326',
    state: 'KS',
    metal_level: 'Silver',
    rate: '212.35',
    rate_area: '6' },
  { plan_id: '02127DK3707648',
    state: 'KS',
    metal_level: 'Silver',
    rate: '251.06',
    rate_area: '6' },
  { plan_id: '00755MW8233171',
    state: 'KS',
    metal_level: 'Silver',
    rate: '212.35',
    rate_area: '6' },
  { plan_id: '06681QF9151145',
    state: 'KS',
    metal_level: 'Silver',
    rate: '245.15',
    rate_area: '6' },
  { plan_id: '26512SR1647736',
    state: 'KS',
    metal_level: 'Silver',
    rate: '218.83',
    rate_area: '6' },
  { plan_id: '69789JG3234541',
    state: 'KS',
    metal_level: 'Silver',
    rate: '237.4',
    rate_area: '6' },
  { plan_id: '89637NG4020233',
    state: 'KS',
    metal_level: 'Silver',
    rate: '228',
    rate_area: '6' },
  { plan_id: '87071UM2692556',
    state: 'KS',
    metal_level: 'Silver',
    rate: '195.46',
    rate_area: '6' },
  { plan_id: '76134RH7763442',
    state: 'KS',
    metal_level: 'Silver',
    rate: '236.85',
    rate_area: '6' } ]

var rate = { zipcode: '67118',
  state: 'KS',
  county_code: '20077',
  name: 'Harper',
  rate_area: '6' }

var line = { zipcode: '67118', rate: '' }

describe('Rate', function() {
    it('should return rate 290.60', function(){
        assert.equal(app.slcspCalc(GAplans), '290.60');
    })
});

describe('Line', function() {
    it('should return rate 212.35', function(){
        assert.equal(app.slcspRates(KSPlans, rate.rate_area, rate.state), '212.35')
    })
});

describe('No KY state data', function (){
    //no KY state data
    it('not found?', function () {
        line = { zipcode: '40813', rate: '' }
        rate = [{ zipcode: '40813',
                state: 'KY',
                county_code: '21013',
                name: 'Bell',
                rate_area: '8' }]
        assert.equal(app.slcspRates(KSPlans, rate.rate_area, rate.state), '');
    })
});

describe('Multiple Rate Areas', function (){
    //no KY state data
    it('54923 has 2 rate areas', function () {
        testJsonline = [{ zipcode: '54923', rate: '' }]
        assert.equal(app.slcspZip(testJsonline), testJsonline);
    })
    it('48872 has 3 rate areas', function () {
        testJsonline = [{ zipcode: '48872', rate: '' }]
        assert.equal(app.slcspZip(testJsonline), testJsonline);
    })
});
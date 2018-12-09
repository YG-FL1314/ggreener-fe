const PARENT_FLAG = 0
const MEMBER_FLAG = 1
const UNIT_PROPERTIES_FLAG = 2
const ATTENTION_FLAG = 3
const REGION_FLAG = 4
const ZOL_FLAG = 5
const CREATE_TIME_FLAG = 6
const EQUITY_PARTICIPATION_FLAG = 7
const HIGH_TECHNOLOGY_FLAG = 8
const COMPANY_MARKET_FLAG = 9
const COMPANY_TYPE_FLAG = 10
const INDUSTRIES_FLAG = 11
const BUSINESS_FLAG = 12 
const BUSINESS_AREA_FLAG = 13
const SEGMENT_MARKET_FLAG = 14
const TECHNOLOGY_PRODUCT_FLAG = 15
const ADVANTAGES_FLAG = 16
const DUTY_FLAG = 144

const PARENT_NAME = '一级标签'
const MEMBER_NAME = '会员等级'
const UNIT_PROPERTIES_NAME = '单位性质'
const ATTENTION_NAME = '关注等级'
const REGION_NAME = '地区'
const ZOL_NAME = '中关村'
const CREATE_TIME_NAME = '成立时间'
const EQUITY_PARTICIPATION_NAME = '出资方式'
const HIGH_TECHNOLOGY_NAME = '高薪技术'
const COMPANY_MARKET_NAME = '上市公司'
const COMPANY_TYPE_NAME = '单位类型'
const INDUSTRIES_NAME = '所属行业'
const BUSINESS_NAME = '主营业务'
const BUSINESS_AREA_NAME = '业务领域'
const SEGMENT_MARKET_NAME = '细分市场'
const TECHNOLOGY_PRODUCT_NAME = '技术产品'
const ADVANTAGES_NAME = '单位优势'
const DUTY_NAME = '职务'

function convertIdToName(parentId) {
    var name = ""
    switch(parentId)
    {
    case 0:
      name = PARENT_NAME
      break;
    case 1:
      name = MEMBER_NAME
      break;
    case 2:
      name = UNIT_PROPERTIES_NAME
      break;
    case 3:
      name = ATTENTION_NAME
      break;
    case 4:
      name = REGION_NAME
      break;
    case 5:
      name = ZOL_NAME
      break;
    case 6:
      name = CREATE_TIME_NAME
      break;
    case 7:
      name = EQUITY_PARTICIPATION_NAME
      break;
    case 8:
      name = HIGH_TECHNOLOGY_NAME
      break;
    case 9:
      name = COMPANY_MARKET_NAME
      break;
    case 10:
      name = COMPANY_TYPE_NAME
      break;
    case 11:
      name = INDUSTRIES_NAME
      break;
    case 12:
      name = BUSINESS_NAME
      break;
    case 13:
      name = BUSINESS_AREA_NAME
      break;
    case 14:
      name = SEGMENT_MARKET_NAME
      break;
    case 15:
      name = TECHNOLOGY_PRODUCT_NAME
      break;
    case 16:
      name = ADVANTAGES_NAME
      break;
    case 144:
      name = DUTY_NAME
      break;
    default:
      name = ""
    }
    return name
}

function isEmpty(str) {
  if(typeof str == "undefined" || str == null || str == ""){
      return true;
  }else{
      return false;
  }
}
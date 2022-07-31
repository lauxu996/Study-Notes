/**
 * 手写createRlement,React.createElement支持多个参数
 * 1.type，也就是节点类型
 * 2.config, 这是节点上的属性，比如id和href
 * 3.children, 从第三个参数开始就全部是children也就是子元素了，子元素可以有多个，类型可以是简单的文本，也可以还是React.createElement，
 * 如果是React.createElement，其实就是子节点了，子节点下面还可以有子节点。这样就用React.createElement的嵌套关系实现了HTML节点的树形结构。
 */
function createElement(type, props, ...children) {
  //核心思想就是将参数传到一个对象上
  //children也要放到props里面，这样我们在逐渐里面就能通过this.props.children拿到子元素
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}
//创建文本虚拟dom
function createTextVDom(text) {
  return {
    Text,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
/**
 * 手写render
 * 渲染到页面的函数式render，ReactDOM.render( <App />,document.getElementById('root'));可以知道他接收两个参数
 * 1.根组件，就是一个jsx组件，也就是一个createElement返回的虚拟DOM
 * 2.父节点，也就是我们要将虚拟DOM渲染的位置
 */
function render(vDom, container) {
  //console.log("22222",vDom)
  let dom;
  //检查当前节点是文本还是对象
  if (typeof vDom !== "object") {
    dom = document.createTextNode(vDom); //创建一个文本节点
  } else {
    dom = document.createElement(vDom.type); //创建根节点元素
  }

  //将VDom上除了children外的属性都挂载到真正的dom上
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter((key) => key !== "children") //筛选出属性
      .forEach((item) => {
        dom[item] = vDom.props[item]; //给标签上面加上属性并附上属性值
      });
  }
  //如果还有子元素，递归调用
  if (vDom.props && vDom.props.children && vDom.props.children.length ) {
    if(typeof vDom.props.children == "object"){
      vDom.props.children.forEach(child => render(child, dom));
    }else{
      render(vDom.props.children, dom) //文本节点
    }
  }
  //console.log("dom",dom)
  //插入到父节点
  container.appendChild(dom);
}

export default {
  createElement,
  render,
  createTextVDom
}

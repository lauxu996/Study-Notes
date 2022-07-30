/**
 * 手写createRlement,React.createElement支持多个参数
 * 1.type，也就是节点类型
 * 2.config, 这是节点上的属性，比如id和href
 * 3.children, 从第三个参数开始就全部是children也就是子元素了，子元素可以有多个，类型可以是简单的文本，也可以还是React.createElement，
 * 如果是React.createElement，其实就是子节点了，子节点下面还可以有子节点。这样就用React.createElement的嵌套关系实现了HTML节点的树形结构。
 */
function createElement(type, props, ...children){
  //核心思想就是将参数传到一个对象上
  //children也要放到props里面，这样我们在逐渐里面就能通过this.props.children拿到子元素
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}
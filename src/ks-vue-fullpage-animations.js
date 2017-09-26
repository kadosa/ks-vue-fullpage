import utils from './utils.js'

/**
 * Get animation params and store it in a constant
 * @param {object} ctx - the context
 * @param el - the element
 * @param {function} done - function to trigger when animation is finished
*/
const getAnimParams = (ctx, el, done) => {
  return {
    easing: ctx.props.options.easing || 'linear',
    duration: ctx.props.options.duration || 1000,
    complete () {
      // Velocity.hook(el, 'translateX', '0%')
      // Velocity.hook(el, 'backgroundPosition', '0 50%')
      done()
    }
  }
}

// component datas for slideX option
export const KsVueFullpageSlideX = {

  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function (h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition-group', ctx.data, ctx.children)  // don't animate until the plugin is fully loaded

    ctx.data.on = {
      enter: function (el, done) {
        const animObj = {} // empty object where we'll push animations

        if (ctx.props.options.parallax) { // if parallax is activated
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          const bgOffset = utils.bgOffset('enter', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset)

          Velocity.hook(el, 'backgroundPosition', bgOffset * ctx.parent.$ksvuefp.wWidth + 'px 50%') // Positionate the background before triggering the animation

          animObj['backgroundPosition'] = '0% 50%' // Push bgPosition animation to our empty object animObj
        }

        const start = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '-100%' : '100%' // Define the full section's translate animation starting offset
        Velocity.hook(el, 'translateX', start) // Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%') // Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 1)

        animObj['translateX'] = '0%'
        animObj['translateZ'] = 0 // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          animObj,
          animParams
        )
      },
      leave: function (el, done) {
        const animObj = {} // empty object where we'll push animations
        if (ctx.props.options.parallax) { // if parallax is activated
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          const bgOffset = utils.bgOffset('leave', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset)

          Velocity.hook(el, 'backgroundPosition', '0% 50%') // Positionate the background before triggering the animation

          animObj['backgroundPosition'] = bgOffset * ctx.parent.$ksvuefp.wWidth + 'px 50%' // Push bgPosition animation to our empty object animObj
        }

        const end = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '100%' : '-100%' // Define the full section's translate animation starting offset
        Velocity.hook(el, 'translateX', '0%')// Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%')// Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 1)

        animObj['translateX'] = end // Push translate animation to our object animObj
        animObj['translateZ'] = 0 // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          animObj,
          animParams
        )
      }
    }

    return h('transition-group', ctx.data, ctx.children)
  }
}

// component datas for slideY option
export const KsVueFullpageSlideY = {
  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function (h, ctx) {
    if (!ctx.parent.$ksvuefp.fpLoaded) return h('transition-group', ctx.data, ctx.children)  // If the plugin is not fully loaded, don't animate and return h() directly

    ctx.data.on = {
      enter: function (el, done) {
        const animObj = {}

        if (ctx.props.options.parallax) {
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          const bgOffset = utils.bgOffset('enter', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset)

          Velocity.hook(el, 'backgroundPosition', '50% ' + bgOffset * ctx.parent.$ksvuefp.wHeight + 'px')

          animObj['backgroundPosition'] = '50% 0%'
        }

        const start = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '-100%' : '100%'
        Velocity.hook(el, 'translateY', start)
        Velocity.hook(el, 'translateX', '0%')
        Velocity.hook(el, 'opacity', 1)

        animObj['translateY'] = '0%'
        animObj['translateZ'] = 0 // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          animObj,
          animParams
        )
      },
      leave: function (el, done) {
        const animObj = {}

        if (ctx.props.options.parallax) {
          /**
           * Get section background's offset and store it in a constant
           * @param {string} action - enter or leave
           * @param {string} direction - up or down
           * @param {float} offset - the parallax offset defined in options
          */
          const bgOffset = utils.bgOffset('leave', ctx.parent.$ksvuefp.sliderDirection, ctx.props.options.parallaxOffset)

          Velocity.hook(el, 'backgroundPosition', ' 50% 0%')

          animObj['backgroundPosition'] = '50% ' + bgOffset * ctx.parent.$ksvuefp.wHeight + 'px'
        }

        const end = ctx.parent.$ksvuefp.sliderDirection === 'up' ? '100%' : '-100%'
        Velocity.hook(el, 'translateY', '0%')
        Velocity.hook(el, 'translateX', '0%')
        Velocity.hook(el, 'opacity', 1)

        animObj['translateY'] = end
        animObj['translateZ'] = 0 // Force 3d rendering

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)
        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          animObj,
          animParams
        )
      }
    }
    return h('transition-group', ctx.data, ctx.children)
  }
}

// component datas for fade option
export const KsVueFullpageFade = {
  props: ['options', 'slidingActive', 'sliderDirection'],
  functional: true,
  render: function (h, ctx) {
    ctx.data.on = {
      enter: function (el, done) {
        Velocity.hook(el, 'backgroundPosition', '50% 50% ')
        Velocity.hook(el, 'translateX', '0%') // Positionate the full section before triggering the animation
        Velocity.hook(el, 'translateY', '0%') // Positionate the full section before triggering the animation
        Velocity.hook(el, 'opacity', 0)

        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          {
            opacity: 1
          },
          animParams
        )
      },
      leave: function (el, done) {
        /**
         * Get animations params
         * @param {object} ctx - the context
         * @param {object} animObj - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        const animParams = getAnimParams(ctx, el, done)

        /**
         * Velocity anim function
         * @param  el - the element
         * @param {object} - the animObject
         * @param {function} animParams - Velocity's animation options
        */
        Velocity(
          el,
          {
            opacity: 0
          },
          animParams
        )
      }
    }

    return h('transition-group', ctx.data, ctx.children)
  }

}

// TODO: add prismX and prismY transitions

// component datas for prismX option
export const KsVueFullpagePrismX = {
  render: function (h) {
    return h(
      'transition-group',
      // { attrs: { name: 'prismX' }, props: { tag: 'div' }},
      null,
      this.$slots.default
    )
  }
}

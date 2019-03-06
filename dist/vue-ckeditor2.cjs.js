'use strict';
function _interopDefault(t) {
  return t && 'object' == typeof t && 'default' in t ? t.default : t;
}
var __vue_normalize__ = _interopDefault(
    require('vue-runtime-helpers/dist/normalize-component.js')
  ),
  inc = new Date().getTime(),
  script = {
    name: 'VueCkeditor',
    props: {
      name: {
        type: String,
        default: function() {
          return 'editor-'.concat(++inc);
        }
      },
      value: { type: String },
      id: {
        type: String,
        default: function() {
          return 'editor-'.concat(inc);
        }
      },
      types: {
        type: String,
        default: function() {
          return 'classic';
        }
      },
      config: { type: Object, default: function() {} },
      instanceReadyCallback: { type: Function },
      readOnlyMode: {
        type: Boolean,
        default: function() {
          return !1;
        }
      }
    },
    data: function() {
      return { instanceValue: '' };
    },
    computed: {
      instance: function() {
        return CKEDITOR.instances[this.id];
      }
    },
    watch: {
      value: function(t) {
        try {
          this.instance && this.update(t);
        } catch (t) {}
      },
      readOnlyMode: function(t) {
        this.instance.setReadOnly(t);
      }
    },
    mounted: function() {
      this.create();
    },
    methods: {
      create: function() {
        var t = this;
        'undefined' == typeof CKEDITOR
          ? console.log('CKEDITOR is missing (http://ckeditor.com/)')
          : ('inline' === this.types
              ? CKEDITOR.inline(this.id, this.config)
              : CKEDITOR.replace(this.id, this.config),
            this.instance.setData(this.value),
            this.instance.on('instanceReady', function() {
              t.instance.setData(t.value);
            }),
            this.instance.on('change', this.onChange),
            this.instance.on('mode', this.onMode),
            this.instance.on('blur', function(e) {
              t.$emit('blur', e);
            }),
            this.instance.on('focus', function(e) {
              t.$emit('focus', e);
            }),
            this.instance.on('contentDom', function(e) {
              t.$emit('contentDom', e);
            }),
            CKEDITOR.on('dialogDefinition', function(e) {
              t.$emit('dialogDefinition', e);
            }),
            this.instance.on('fileUploadRequest', function(e) {
              t.$emit('fileUploadRequest', e);
            }),
            this.instance.on('fileUploadResponse', function(e) {
              setTimeout(function() {
                t.onChange();
              }, 0),
                t.$emit('fileUploadResponse', e);
            }),
            void 0 !== this.instanceReadyCallback &&
              this.instance.on('instanceReady', this.instanceReadyCallback),
            this.$once('hook:beforeDestroy', function() {
              t.destroy();
            }));
      },
      update: function(t) {
        this.instanceValue !== t && this.instance.setData(t, { internal: !1 });
      },
      destroy: function() {
        try {
          var t = window.CKEDITOR;
          t.instances && t.instances[this.id] && t.instances[this.id].destroy();
        } catch (t) {}
      },
      onMode: function() {
        var t = this;
        if ('source' === this.instance.mode) {
          var e = this.instance.editable();
          e.attachListener(e, 'input', function() {
            t.onChange();
          });
        }
      },
      onChange: function() {
        var t = this.instance.getData();
        t !== this.value && (this.$emit('input', t), (this.instanceValue = t));
      }
    }
  };
const __vue_script__ = script;
var __vue_render__ = function() {
    var t = this.$createElement,
      e = this._self._c || t;
    return e('div', { staticClass: 'ckeditor' }, [
      e('textarea', {
        attrs: {
          name: this.name,
          id: this.id,
          types: this.types,
          config: this.config,
          disabled: this.readOnlyMode
        },
        domProps: { value: this.value }
      })
    ]);
  },
  __vue_staticRenderFns__ = [];
const __vue_inject_styles__ = void 0,
  __vue_scope_id__ = void 0,
  __vue_module_identifier__ = void 0,
  __vue_is_functional_template__ = !1;
var VueCkeditor = __vue_normalize__(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  void 0,
  __vue_script__,
  void 0,
  !1,
  void 0,
  void 0,
  void 0
);
module.exports = VueCkeditor;

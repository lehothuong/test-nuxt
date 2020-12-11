<template>
  <section class="pt-lg-3 benefitBg">
    <div class="container">
      <article>
        <Banner></Banner>
        <ProductIndexBest class="d-none d-lg-block"></ProductIndexBest>
        <div id="appScroll" class="d-flex align-items-center mt-lg-5 mt-3">
          <img alt="goCASHBACK" src="../../assets/img/icon/star.svg" width="20" height="25" />
          <h5 class="titleHot ml-2 pl-1">Bạn đang cần mua gì?</h5>
        </div>
        <div v-if="isLoading" class="boxCategoryFilter">
          <div class="row mx-2-minus mx-5px-minus product-best-row pb-lg-5 loadingCategory">
            <div class="col-3 px-lg-2 px-5-res col-custom" v-for="(item, index) in 3" :key="index">
              <content-placeholders centered class="placeholder-category">
                <content-placeholders-img />
                <content-placeholders-text class="title" :lines="1" />
              </content-placeholders>
            </div>
          </div>
        </div>
        <div v-else class="boxCategoryFilter">
          <div class="row mx-2-minus mx-5px-minus pb-lg-3" :class="{ 'pb-lg-5': !categoryId }">
            <div
              class="col-lg-3 px-lg-2 px-5-res mt-2 col-custom"
              v-for="(item, index) in categoryLevelSingles"
              :key="index"
              @click.prevent="handleSendIdCategory(index, item.category)"
            >
              <BoxCategoryProduct
                class="bg-white border-3"
                :class="{ boxCategoryBgColorActive: index == active }"
                :index="index"
                :active="active"
                :item="item.category"
              ></BoxCategoryProduct>
            </div>
          </div>
        </div>
        <div
          class="boxFilter pb-lg-5"
          v-if="
            categoryId && listBrands.length > 0 && propertyFilter.length > 0
          "
        >
          <div
            class="navigationFilter position-relative d-none d-lg-block"
            :class="{ boxFiterLoading: isLoadingCategory }"
          >
            <div class="d-flex">
              <b-dropdown
                v-if="isShowFirst"
                :menu-class="{
                  'scrollbar dropdownHeight':
                    objFirstProperty.value.length >= 10
                }"
                id="dropdown-1"
                :text="objFirstProperty.name"
              >
                <b-form-checkbox-group
                  class="custom-radio-local"
                  @input="handleSub()"
                  v-model="firstId"
                >
                  <b-form-checkbox
                    @change="
                      handleFirstProperty(
                        option.id,
                        option.name,
                        objFirstProperty.id
                      )
                    "
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in objFirstProperty.value"
                  >{{ option.name }}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-dropdown>
              <b-dropdown
                v-if="subCategories && subCategories.length > 0"
                :menu-class="{
                  'scrollbar dropdownHeight': subCategories.length >= 10
                }"
                id="dropdown-1"
                text="Loại bỉm"
              >
                <b-form-checkbox-group
                  class="custom-radio-local"
                  @input="handleSub()"
                  v-model="subCategoryId"
                >
                  <b-form-checkbox
                    @change="handleSubCategory(option.id, option.name)"
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in subCategories"
                  >{{ option.name }}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-dropdown>
              <b-dropdown
                :menu-class="{
                  'scrollbar dropdownHeight': listBrands.length >= 10
                }"
                id="dropdown-1"
                text="Thương hiệu"
              >
                <b-form-checkbox-group
                  class="custom-radio-local"
                  @input="handleSub()"
                  v-model="brandId"
                >
                  <b-form-checkbox
                    @change="handleBrand(option.id, option.name)"
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in listBrands"
                  >{{ option.name }}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-dropdown>
              <div class="d-flex" v-for="item in propertyFilter" :key="item.id">
                <b-dropdown
                  :menu-class="{
                    'scrollbar dropdownHeight': item.value.length >= 10
                  }"
                  :text="item.name"
                >
                  <b-form-checkbox-group
                    value-field="id"
                    text-field="name"
                    :options="item.value"
                    @input="handleProperty()"
                    class="custom-radio-local"
                    v-model="listProperty[item.id]"
                  ></b-form-checkbox-group>
                </b-dropdown>
              </div>
              <div v-if="isHasCombo" class="combo">
                <b-form-checkbox value="1" unchecked-value="0" v-model="isCombo">Combo giá tốt</b-form-checkbox>
              </div>
              <b-dropdown
                right
                class="ml-auto sortDropdown"
                id="dropdown-1"
                :text="sort.sortText"
                v-model="sort.sortType"
                @input="filter()"
              >
                <b-dropdown-item
                  :link-class="{
                    'font-weight-bold': sort.sortText == item.text,
                    sortPadding: true
                  }"
                  v-for="(item, index) in optionSort"
                  :key="index"
                  @click="handleSort(item)"
                >{{ item.text }}</b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-if="tagFilters.length > 0" class="w-100 tagFilter px-lg-2 mb-lg-1">
              <div class="borderFilter">
                <div class="tag mr-lg-2" v-for="item in tagFilters" :key="item.id">
                  <span class="mr-lg-3">{{ item.name }}</span>
                  <a
                    class="remove pointer"
                    @click.prevent="
                      removetagFilterItem(
                        item.id,
                        item.name,
                        item.idParentProperty
                      )
                    "
                  ></a>
                </div>
                <a class="removeAll pointer" @click.prevent="removetagFilter">Xóa hết</a>
              </div>
            </div>
            <div class="w-100 px-lg-3 mt-lg-2 position-relative" v-if="listSubBrand.length > 0">
              <b-form-group class="growAll" id="grow-1">
                <div class="subBrandAll sub-1">
                  <p class="mb-lg-2">Nhãn hàng cho bạn</p>
                  <b-form-checkbox-group
                    v-model="subBrandId"
                    :options="listSubBrand"
                    @input="filter()"
                    name="buttons-1"
                    value-field="id"
                    text-field="name"
                    buttons
                    class="subBrand"
                  ></b-form-checkbox-group>
                </div>
              </b-form-group>
              <div class="text-center">
                <input
                  type="button"
                  class="btn btnMoreRead w-100"
                  id="more-button-1"
                  value="Thu gọn"
                  @click.prevent="
                    growDiv('grow-1', 'sub-1', 'more-button-1', 12)
                  "
                />
              </div>
            </div>
          </div>
          <div class="boxFilterMobile d-block d-lg-none mt-10-res">
            <div class="d-flex align-items-center navigationFilter position-relative">
              <div class="text-uppercase pl-2">
                <a @click="mobileFilterPopup = true" class="pointer d-flex align-items-center">
                  <img
                    src="../../assets/img/icon/icon_filter.svg"
                    class="mr-2"
                    width="17"
                    height="17"
                  />
                  <p
                    class="activeIcon"
                    v-if="
                      (firstId && firstId.length > 0) ||
                        (brandId && brandId.length > 0) ||
                        (subBrandId && subBrandId.length > 0) ||
                        tagFilterProperty.length > 0
                    "
                  ></p>Lọc
                </a>
              </div>
              <b-dropdown
                right
                class="ml-auto sortDropdown"
                id="dropdown-1"
                :text="sort.sortText"
                v-model="sort.sortType"
                @input="filter()"
              >
                <b-dropdown-item
                  :link-class="{
                    'font-weight-bold': sort.sortText == item.text,
                    sortPadding: true
                  }"
                  v-for="(item, index) in optionSort"
                  :key="index"
                  @click="handleSort(item)"
                >{{ item.text }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="d-none d-lg-block">
            <div class="d-flex w-100">
              <div class="w-100">
                <p class="mb-1 mt-lg-4 mt-3">
                  Tìm thấy
                  <span class="font-weight-bold">
                    {{
                    formatNumber(totalPage)
                    }}
                  </span>
                  sản phẩm
                </p>
                <div v-if="isLoadingCategory" class="row mx-2-minus mx-5px-minus product-best-row">
                  <div
                    class="col-lg-3 col-6 px-5-res px-lg-2"
                    v-for="(item, index) in 12"
                    :key="index"
                  >
                    <content-placeholders centered class="placeholder-box-product">
                      <content-placeholders-img />
                      <content-placeholders-text class="title" :lines="1" />
                      <content-placeholders-text class="title1" :lines="1" />
                      <content-placeholders-text class="title2" :lines="1" />
                      <content-placeholders-text class="mt-lg-3" :lines="1" />
                    </content-placeholders>
                  </div>
                </div>
                <div v-else>
                  <div v-if="totalPage > 0">
                    <div class="row mx-2-minus mx-5px-minus">
                      <div
                        class="col-lg-3 col-6 px-5-res px-lg-2"
                        v-for="(item, index) in productFilters"
                        :key="index"
                      >
                        <BoxProductFilter
                          v-if="item.target_url"
                          :products="item"
                          :isCheckBestPrice="isCheckBestPrice"
                        ></BoxProductFilter>
                        <BoxProduct v-else :products="item" :isCheckBestPrice="isCheckBestPrice"></BoxProduct>
                      </div>
                    </div>
                    <div class="d-none d-lg-block">
                      <div class="d-flex justify-content-end mt-lg-3">
                        <a @click="scrollBehavior()">
                          <b-pagination
                            class="custom-pagination"
                            v-model="pagination.currenPage"
                            :total-rows="totalPage"
                            :per-page="pagination.pageSize"
                            @input="filter(pagination.currenPage)"
                            size="sm"
                            last-number
                            first-number
                          ></b-pagination>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div v-else class="mt-lg-5 text-center">
                    <p>Chưa có sản phẩm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-block d-lg-none">
            <div class="d-flex w-100">
              <div class="w-100">
                <p v-if="totalPage > 0" class="mb-1 mt-lg-4 mt-3">
                  Tìm thấy
                  <span class="font-weight-bold">
                    {{
                    formatNumber(totalPage)
                    }}
                  </span>
                  sản phẩm
                </p>
                <div>
                  <div class="row mx-2-minus mx-5px-minus">
                    <div
                      class="d-flex justify-content-center w-100 my-3 text-center"
                      v-if="isLoadingProductMobile"
                    >
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="col-lg-3 col-6 px-5-res px-lg-2"
                      v-for="(item, index) in productFilters"
                      :key="index"
                    >
                      <BoxProductFilter
                        v-if="item.target_url"
                        :products="item"
                        :isCheckBestPrice="isCheckBestPrice"
                      ></BoxProductFilter>
                      <BoxProduct v-else :products="item" :isCheckBestPrice="isCheckBestPrice"></BoxProduct>
                    </div>
                  </div>
                  <div class="d-block d-lg-none" v-if="!isLoadingProductMobile">
                    <div
                      class="d-flex justify-content-center my-3"
                      v-if="isLoadingCategoryProductMobile"
                    >
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div v-else>
                      <button
                        v-if="productFilters.length < totalPage"
                        type="submit"
                        @click.prevent="handlePagination()"
                        class="btn w-100 text-uppercase font-weight-bold my-3 rounded btnSearchReverse btn-secondary"
                      >Xem thêm</button>
                    </div>
                  </div>
                </div>
                <div v-if="totalPage <= 0" class="mt-lg-5 mt-3 text-center">
                  <p v-if="!isLoadingCategory">Chưa có sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="pb-lg-5 text-center" v-if="!categoryId && productFilters.length == 0">
                    <p>Chưa có sản phẩm</p>
        </div>-->
      </article>
    </div>
    <b-modal
      v-model="mobileFilterPopup"
      :content-class="{ overLoadings: isLoadingCategory }"
      :body-class="{ 'pointer-none ': isLoadingCategory }"
      modal-class="login-modal popupFilter d-block d-lg-none"
    >
      <template v-slot:modal-title>
        <p class="text-uppercase">Lọc sản phẩm</p>
      </template>
      <!-- <div class="overLoadings" v-if="isLoadingCategory">
                <div class="lds-dual-ring"></div>
      </div>-->
      <div class="popupFilterContent">
        <div v-if="isHasCombo" class="commoMobile mt-3 mb-1">
          <p class="title">Loại sản phẩm</p>
          <div class="row">
            <div class="col-6 mt-1">
              <b-form-checkbox
                v-model="isCombo"
                value="1"
                unchecked-value="0"
                class="radioCombo"
                button
                button-variant="primary"
              >Combo giá tốt</b-form-checkbox>
            </div>
          </div>
        </div>
        <div v-if="subCategories && subCategories.length > 0">
          <b-form-group class="mt-3 mb-1" label="Loại bỉm">
            <div
              class="growAll"
              :class="
                subCategories && subCategories.length > 6 ? 'growAllHeight' : ''
              "
              id="grow-3"
            >
              <div class="sub-3">
                <b-form-checkbox-group
                  class="custom-radio-local custom-radio-local-mobile"
                  v-model="subCategoryId"
                  buttons
                  button-variant="primary"
                >
                  <b-form-checkbox
                    @change="handleSubCategory(option.id, option.name)"
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in subCategories"
                  >{{ option.name }}</b-form-checkbox>
                </b-form-checkbox-group>
              </div>
            </div>
          </b-form-group>
        </div>
        <div v-if="isShowFirst">
          <b-form-group class="mt-3 mb-1" :label="objFirstProperty.name">
            <div
              class="growAll"
              :class="
                objFirstProperty.value && objFirstProperty.value.length > 6
                  ? 'growAllHeight'
                  : ''
              "
              id="grow-2"
            >
              <div class="sub-2">
                <b-form-checkbox-group
                  class="custom-radio-local custom-radio-local-mobile"
                  @input="handleSub()"
                  v-model="firstId"
                  buttons
                  button-variant="primary"
                >
                  <b-form-checkbox
                    @change="
                      handleFirstProperty(
                        option.id,
                        option.name,
                        objFirstProperty.id
                      )
                    "
                    :value="option.id"
                    :key="option.id"
                    inline
                    v-for="option in objFirstProperty.value"
                  >
                    <span>{{ option.name }}</span>
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </div>
            </div>
          </b-form-group>
          <div
            class="text-center"
            v-show="objFirstProperty.value && objFirstProperty.value.length > 6"
          >
            <div class="btnMoreReadContent" id="icon-button-2">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                id="more-button-2"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    'grow-2',
                    'sub-2',
                    'more-button-2',
                    138,
                    'icon-button-2'
                  )
                "
              />
            </div>
          </div>
        </div>

        <b-form-group class="mt-3 mb-1" label="Thương hiệu">
          <div
            class="growAll"
            :class="listBrands && listBrands.length > 6 ? 'growAllHeight' : ''"
            id="grow-3"
          >
            <div class="sub-3">
              <b-form-checkbox-group
                class="custom-radio-local custom-radio-local-mobile"
                @input="handleSub()"
                v-model="brandId"
                buttons
                button-variant="primary"
              >
                <b-form-checkbox
                  @change="handleBrand(option.id, option.name)"
                  :value="option.id"
                  :key="option.id"
                  inline
                  v-for="option in listBrands"
                >{{ option.name }}</b-form-checkbox>
              </b-form-checkbox-group>
            </div>
          </div>
        </b-form-group>
        <div class="text-center" v-show="listBrands && listBrands.length > 6">
          <div class="btnMoreReadContent" id="icon-button-3">
            <input
              type="button"
              class="btn btnMoreRead w-100"
              id="more-button-3"
              value="Xem thêm"
              @click.prevent="
                growDivReverse(
                  'grow-3',
                  'sub-3',
                  'more-button-3',
                  138,
                  'icon-button-3'
                )
              "
            />
          </div>
        </div>
        <div id="subScroll">
          <b-form-group
            v-show="listSubBrand.length > 0"
            class="mt-3 mb-1"
            label="Nhãn hàng cho bạn"
          >
            <div
              class="growAll"
              :class="
                listSubBrand && listSubBrand.length > 6 ? 'growAllHeight' : ''
              "
              id="grow-4"
            >
              <div class="sub-4">
                <b-form-checkbox-group
                  class="custom-radio-local custom-radio-local-mobile"
                  @input="filter()"
                  v-model="subBrandId"
                  :options="listSubBrand"
                  value-field="id"
                  text-field="name"
                  name="buttons-1"
                  buttons
                  button-variant="primary"
                ></b-form-checkbox-group>
              </div>
            </div>
          </b-form-group>
        </div>
        <div class="text-center" v-show="listSubBrand && listSubBrand.length > 6">
          <div class="btnMoreReadContent" id="icon-button-4">
            <input
              type="button"
              class="btn btnMoreRead w-100"
              id="more-button-4"
              value="Xem thêm"
              @click.prevent="
                growDivReverse(
                  'grow-4',
                  'sub-4',
                  'more-button-4',
                  138,
                  'icon-button-4'
                )
              "
            />
          </div>
        </div>
        <div v-for="item in propertyFilter" :key="item.id">
          <b-form-group class="mt-3 mb-1" :label="item.name">
            <div
              class="growAll"
              :class="
                item.value && item.value.length > 6 ? 'growAllHeight' : ''
              "
              :id="`grows-${item.id}`"
            >
              <div :class="`subs-${item.id}`">
                <b-form-checkbox-group
                  value-field="id"
                  text-field="name"
                  class="custom-radio-local custom-radio-local-mobile"
                  :options="item.value"
                  @input="handleProperty()"
                  v-model="listProperty[item.id]"
                  buttons
                  button-variant="primary"
                ></b-form-checkbox-group>
              </div>
            </div>
          </b-form-group>
          <div class="text-center" v-show="item.value && item.value.length > 6">
            <div class="btnMoreReadContent" :id="`icon-button-${item.id}`">
              <input
                type="button"
                class="btn btnMoreRead w-100"
                :id="`more-buttons-${item.id}`"
                value="Xem thêm"
                @click.prevent="
                  growDivReverse(
                    `grows-${item.id}`,
                    `subs-${item.id}`,
                    `more-buttons-${item.id}`,
                    138,
                    `icon-button-${item.id}`
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <div class="d-flex flex-column h-100 justify-content-between w-100 mb-4">
          <div class="d-flex h-100 justify-content-center align-items-center w-100">
            <p class="mt-2 mb-2">
              Tìm thấy
              <span class="font-weight-bold">
                {{
                formatNumber(totalPage)
                }}
              </span>
              sản phẩm
            </p>
          </div>
          <div class="row">
            <div class="col-6">
              <button
                type="submit"
                @click.prevent="removetagFilter"
                class="btn w-100 text-uppercase font-weight-bold py-lg-3 my-lg-3 rounded btnSearchReverse btn-secondary"
              >Xóa bộ lọc</button>
            </div>
            <div class="col-6">
              <button
                type="submit"
                @click.prevent="cancel()"
                class="btn w-100 text-uppercase font-weight-bold py-lg-3 my-lg-3 rounded btnSearch btn-secondary"
              >Xem sản phẩm</button>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </section>
</template>
<script>
import Banner from "../../components/products/Banner";
import ProductIndexBest from "../../components/products/ProductIndexBest";
import BoxCategoryProduct from "../../components/BoxCategoryProduct";
import BoxProductFilter from "../../components/BoxProductFilter";
import BoxProduct from "../../components/BoxProduct";
import { StringCategories } from "@/api/enum";
import _ from "lodash";
// const ProductService = () => import("@/api/product")
import ProductService from "@/api/product";
export default {
  components: {
    Banner,
    ProductIndexBest,
    BoxCategoryProduct,
    BoxProductFilter,
    BoxProduct
  },

  asyncData({ query }) {
    // if(query.categoryId){
    //     console.log(query.categoryId)
    //     return { categoryId: parseInt(query.categoryId,10) }
    // }
    // return {}
  },
  data() {
    return {
      active: false,
      listProperty: {},
      mobileFilterPopup: false,
      brandId: [],
      subCategoryId: [],
      isCheckBestPrice: true,
      isLoadingCategory: false,
      isLoadingProductMobile: false,
      isLoadingCategoryProductMobile: false,
      tagFilterBrand: [],
      tagFilterProperty: [],
      tagFilterFirstProperty: [],
      objSubBrand: {},
      activeSub: undefined,
      isHasCombo: undefined,
      isCombo: 0,
      subCategories: [],
      listSubBrand: [],
      arraySubBrand: [],
      tagFilters: [],
      subBrandId: [],
      isShowFirst: false,
      firstId: [],
      objFirstProperty: {},
      totalPage: 0,
      pagination: {
        currenPage: 1,
        pageSize: 12
      },
      products: [],
      productFilters: [],
      sort: {
        sortType: "asc",
        sortText: "Giá tăng dần",
        sortField: "discount"
      },
      optionSort: [
        { value: "asc", text: "Giá tăng dần", type: "discount" },
        { value: "desc", text: "Giá giảm dần", type: "discount" },
        { value: "desc", text: "Tỉ lệ giảm cao", type: "discount_rate" }
        // { value: 'desc', text: 'Giá giảm dần',type:'discount_rate' },
      ],
      arrFilters: [],
      propertyFilter: [],
      categoryLevelSingles: {},
      isLoading: false,
      listBrands: [],
      categoryId: undefined,
      dataIndex: undefined
    };
  },
  created() {
    this.getProductBestPrice();
    this.getProductListCategories();
  },
  mounted() {},
  watch: {
    isCombo: function(val) {
      this.pagination.currenPage = 1;
      this.filter();
    },
    categoryId: function(val) {
      this.tagFilters.splice(0, this.tagFilters.length);
      this.brandId.splice(0, this.brandId.length);
      this.tagFilterBrand.splice(0, this.tagFilterBrand.length);
      this.tagFilterProperty.splice(0, this.tagFilterProperty.length);
      this.arrFilters.splice(0, this.arrFilters.length);
      this.tagFilterFirstProperty.splice(0, this.tagFilterFirstProperty.length);
      this.firstId.splice(0, this.firstId.length);
      this.listSubBrand.splice(0, this.listSubBrand.length);
      this.subBrandId.splice(0, this.subBrandId.length);
      this.isCombo = 0;
      for (var i = 0; i < Object.keys(this.listProperty).length; i++) {
        let a = Object.keys(this.listProperty)[i];
        this.listProperty[a] = [];
      }
    }
  },
  computed: {},
  methods: {
    onBackKeyDown(e) {
      e.preventDefault();
      this.$router.push("/me-va-be");
    },
    async handlePagination() {
      this.pagination.currenPage += 1;
      this.isLoadingCategory = true;
      this.isLoadingCategoryProductMobile = true;
      ProductService.postProductFilter(
        this.$axios,
        this.categoryId,
        this.brandId,
        this.isCombo,
        this.subCategoryId,
        this.subBrandId,
        this.arrFilters,
        this.sort.sortField,
        this.sort.sortType,
        this.pagination.currenPage,
        this.$device.isDesktop
          ? (this.pagination.pageSize = 40)
          : (this.pagination.pageSize = 20)
      ).then(resp => {
        this.productFilters = this.productFilters.concat(
          resp.data.data.products
        );
        this.totalPage = resp.data.data.total;
        this.isLoadingCategory = false;
        this.isLoadingCategoryProductMobile = false;
      });
    },
    growDivReverse(v1, v2, v3, number, v4) {
      var growDiv = document.getElementById(v1);
      if (growDiv.clientHeight > number) {
        growDiv.style.height = number + "px";
        // growDiv.classList.add("contentSlider")
      } else {
        var wrapper = document.querySelector("." + v2);
        growDiv.style.height = wrapper.clientHeight + "px";
        // growDiv.classList.remove("contentSlider");
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Xem thêm"
          ? "Thu gọn"
          : "Xem thêm";
      document.getElementById(v3).value == "Xem thêm"
        ? document.getElementById(v4).classList.remove("changeMyIcon")
        : document.getElementById(v4).classList.add("changeMyIcon");
    },
    growDiv(v1, v2, v3, number) {
      var growDiv = document.getElementById(v1);
      var wrapper = document.querySelector("." + v2);
      growDiv.style.height = wrapper.clientHeight + "px";
      if (growDiv.clientHeight != number) {
        growDiv.style.height = number + "px";
        growDiv.classList.add("contentSlider");
      } else {
        growDiv.style.height = wrapper.clientHeight + "px";
        growDiv.classList.remove("contentSlider");
      }
      document.getElementById(v3).value =
        document.getElementById(v3).value == "Thu gọn" ? "Xem thêm" : "Thu gọn";
    },
    customCategories() {
      this.listBrands = this.categoryLevelSingles[this.active].brand;
      this.hanledProperty();
      this.getCategoryById();
      this.getSubCategories();
      this.isHasCombo = this.categoryLevelSingles[
        this.active
      ].category.has_combo;
      this.isHasCombo = this.isHasCombo == 1 ? true : false;
    },
    removetagFilter() {
      this.tagFilters.splice(0, this.tagFilters.length);
      this.brandId.splice(0, this.brandId.length);
      this.tagFilterBrand.splice(0, this.tagFilterBrand.length);
      this.tagFilterProperty.splice(0, this.tagFilterProperty.length);
      this.tagFilterFirstProperty.splice(0, this.tagFilterFirstProperty.length);
      this.firstId.splice(0, this.firstId.length);
      this.listSubBrand.splice(0, this.listSubBrand.length);
      this.subBrandId.splice(0, this.subBrandId.length);
      this.subCategoryId.splice(0, this.subCategoryId.length);
      for (var i = 0; i < Object.keys(this.listProperty).length; i++) {
        let a = Object.keys(this.listProperty)[i];
        this.listProperty[a] = [];
      }
      this.handleSub();
      this.filter();
    },

    removetagFilterItem(id, name, parentId) {
      let index = this.tagFilters.findIndex(item => item.id === id);
      if (index !== -1) {
        this.tagFilters.splice(index, 1);
      }

      let index1 = this.tagFilterBrand.findIndex(
        item => item.id === id && item.name === name
      );
      if (index1 != -1) {
        if (
          this.brandId.includes(id) &&
          this.listBrands.some(item => item.name === name)
        ) {
          let indexBrand = this.brandId.indexOf(id);
          this.brandId.splice(indexBrand, 1);
        } else if (
          this.subCategoryId.includes(id) &&
          this.subCategories.some(item => item.name === name)
        ) {
          let indexBrand = this.subCategoryId.indexOf(id);
          this.subCategoryId.splice(indexBrand, 1);
        }

        this.tagFilterBrand.splice(index1, 1);
        this.listSubBrand.splice(0, this.listSubBrand.length);
        this.subBrandId.splice(0, this.subBrandId.length);
      }

      let index2 = this.tagFilterProperty.findIndex(
        item =>
          item.id === id &&
          item.name === name &&
          item.idParentProperty === parentId
      );
      if (index2 != -1) {
        this.tagFilterProperty.splice(index2, 1);
      }

      let index3 = this.tagFilterFirstProperty.findIndex(
        item =>
          item.id === id &&
          item.name === name &&
          item.idParentProperty === parentId
      );
      if (index3 != -1) {
        this.tagFilterFirstProperty.splice(index3, 1);
        this.firstId.splice(index3, 1);
      }

      if (parentId) {
        let res = Object.keys(this.listProperty).findIndex(e => e == parentId);
        if (res !== -1) {
          let indexProperty = Object.values(this.listProperty)[res].findIndex(
            item => item === id
          );
          if (indexProperty !== -1)
            Object.values(this.listProperty)[res].splice(indexProperty, 1);
        }
      }
      this.handleSub();
      this.filter();
    },
    handleSubCategory(id, name) {
      if (this.tagFilterBrand.filter(item => item.id == id).length == 0) {
        this.tagFilterBrand.push({
          id: id,
          name: name,
          idParentProperty: ""
        });
      } else {
        let position = this.tagFilterBrand.findIndex(e => e.id == id);
        this.tagFilterBrand.splice(position, 1);
      }

      this.tagFilters = [
        ...this.tagFilterFirstProperty,
        ...this.tagFilterBrand,
        ...this.tagFilterProperty
      ];
      this.filter();
    },
    handleSub() {
      let a = [];
      var myArray = [];
      this.listSubBrand = [];
      let reskey = [];
      if (this.brandId.length == 0) {
        this.subBrandId.splice(0, this.subBrandId.length);
      }
      if (this.firstId.length > 0) {
        for (var keyBrand of this.brandId) {
          if (this.objSubBrand.hasOwnProperty(keyBrand)) {
            for (var keyAge of this.tagFilterFirstProperty) {
              reskey = this.objSubBrand[keyBrand];
              for (var keySub of reskey[keyAge.name]) {
                myArray.push(keySub);
              }
            }
          }
        }
      } else {
        for (var key of this.brandId) {
          if (this.objSubBrand.hasOwnProperty(key)) {
            a = _.values(this.objSubBrand[key]);
            for (var i = 0; i < a.length; i++) {
              for (var j = 0; j < a[i].length; j++) {
                myArray.push(a[i][j]);
              }
            }
          }
        }
      }
      this.listSubBrand = myArray.filter(
        (v, i, a) => a.findIndex(t => t.id === v.id) === i
      );
      this.pagination.currenPage = 1;
      // this.filter();
    },
    // scrollSubBrand(){
    //     document.getElementById('subScroll').scrollIntoView({
    //         behavior: 'smooth',
    //          block :'start'
    //     });
    // },
    //brand
    handleBrand(id, name) {
      // this.tagFilterBrand=[]

      if (this.$device.isMobile) {
        //    const element = document.getElementById('subScroll');
        //     let offset = 0;
        //     const bodyRect = document.body.getBoundingClientRect().top;
        //     const elementRect = element.getBoundingClientRect().top;
        //     const elementPosition = elementRect - bodyRect;
        //     const offsetPosition = elementPosition - offset;
        //     window.scrollTo({
        //         top: offsetPosition,
        //         behavior: 'smooth'
        //     });
        document.getElementById("subScroll").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      if (this.tagFilterBrand.filter(item => item.id == id).length == 0) {
        this.tagFilterBrand.push({
          id: id,
          name: name,
          idParentProperty: ""
        });
      } else {
        let position = this.tagFilterBrand.findIndex(e => e.id == id);
        this.tagFilterBrand.splice(position, 1);
      }

      this.tagFilters = [
        ...this.tagFilterFirstProperty,
        ...this.tagFilterBrand,
        ...this.tagFilterProperty
      ];
      this.filter();
    },
    handleFirstProperty(id, name, idParent) {
      if (this.isShowFirst) {
        if (
          this.tagFilterFirstProperty.filter(item => item.id == id).length == 0
        ) {
          this.tagFilterFirstProperty.push({
            id: id,
            name: name,
            idParentProperty: idParent
          });
        } else {
          let position = this.tagFilterFirstProperty.findIndex(e => e.id == id);
          this.tagFilterFirstProperty.splice(position, 1);
        }
        // console.log()
        this.tagFilters = [
          ...this.tagFilterFirstProperty,
          ...this.tagFilterBrand,
          ...this.tagFilterProperty
        ];
        this.filter();
      }
    },

    handleProperty() {
      this.tagFilterProperty = [];
      let arr = this.categoryLevelSingles[this.active].property;
      if (Object.values(this.listProperty)[0]) {
        for (var i = 0; i < Object.keys(this.listProperty).length; i++) {
          let rs = Array.from(arr).find(
            e => e.id == Object.keys(this.listProperty)[i]
          );
          if (rs) {
            for (
              var j = 0;
              j < Object.values(this.listProperty)[i].length;
              j++
            ) {
              let x = Object.assign(rs).value.find(
                p => p.id == Object.values(this.listProperty)[i][j]
              );
              this.tagFilterProperty.push({
                id: x.id,
                name: x.name,
                idParentProperty: Object.keys(this.listProperty)[i]
              });
            }
          }
        }
      }
      this.tagFilters = [
        ...this.tagFilterFirstProperty,
        ...this.tagFilterBrand,
        ...this.tagFilterProperty
      ];
      this.pagination.currenPage = 1;
      this.filter();
    },
    scrollBehavior() {
      document.getElementById("appScroll").scrollIntoView({
        behavior: "smooth"
      });
    },
    handleSort(obj) {
      this.sort.sortType = obj.value;
      this.sort.sortText = obj.text;
      this.sort.sortField = obj.type;
      this.pagination.currenPage = 1;
      this.filter();
    },
    getCategoryById() {
      this.categoryId = this.categoryLevelSingles[this.active].category.id;
    },
    getSubCategories() {
      this.subCategories = this.categoryLevelSingles[
        this.active
      ].sub_categories;
    },
    hanledProperty() {
      let arr = this.categoryLevelSingles[this.active].property;
      // let a = [ { "id": 1, "slug": "khoi-luong-sua-cho-be", "name": "Khối lượng (g)", "show_first": 0, "value": [ { "id": 45, "name": "Hộp super lớn (>1.000gr)" }, { "id": 46, "name": "Hộp lớn (800-900gr)" }, { "id": 47, "name": "Hộp nhỏ (<600gr)" } ] }, { "id": 27, "slug": "do-tuoi", "name": "Độ tuổi", "show_first": 1, "value": [ { "id": 28, "name": "0-6 tháng" }, { "id": 29, "name": "6-12 tháng" }, { "id": 30, "name": "1-2 tuổi" }, { "id": 31, "name": "2-4 tuổi" }, { "id": 32, "name": "4-6 tuổi" } ] },{ "id": 29, "slug": "xe", "name": "Xe", "show_first": 0, "value": [ { "id": 28, "name": "0-6 tháng" }, { "id": 29, "name": "6-12 tháng" }, { "id": 30, "name": "1-2 tuổi" }, { "id": 31, "name": "2-4 tuổi" }, { "id": 32, "name": "4-6 tuổi" } ] } ]
      var found = arr.find(function(element) {
        return element.show_first == 1;
      });
      if (found) {
        this.isShowFirst = true;
        this.objFirstProperty = found;
        this.propertyFilter = arr.filter(item => item.show_first === 0);
      } else {
        this.isShowFirst = false;
        this.propertyFilter = arr;
      }
    },
    getProductBestPrice() {
      ProductService.getProductBestPrice(this.$axios).then(resp => {
        this.products = resp.data.data;
      });
    },
    handleInputSelect(v1, v2) {
      const found = v1.find(element => element.value === v2);
      if (v2) {
        this.sortField = found.type;
      }
    },
    getProductListCategories() {
      this.isLoading = true;
      ProductService.getProductListCategories(this.$axios).then(resp => {
        this.categoryLevelSingles = resp.data.data;
        this.isLoading = false;
      });
    },

    async handleSendIdCategory(v, obj) {
      this.isLoadingProductMobile = true;
      this.active = v;
      // document.getElementById('appScroll').scrollIntoView({
      //     behavior: 'smooth',
      //     block :'center'
      // });
      await this.getSubBrand(obj.id);
      this.customCategories();
      this.pagination.currenPage = 1;
      this.filter();
      const element = document.getElementById("appScroll");
      let offset = 0;
      this.$device.isDesktop ? (offset = 0) : (offset = 100);
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
        block: "center"
      });
    },
    async getSubBrand(categoryId) {
      let response = await ProductService.getSubBrand(
        this.$axios,
        categoryId
      ).catch(e => console.log(e));
      this.objSubBrand = response.data;
      this.isLoadingCategory = false;
    },
    handleUrl(url, string) {
      var url = new URL(url);
      var c = url.searchParams.get(string);
      return c;
    },
    handler() {},
    filter() {
      let arraySr = [...this.tagFilterProperty];
      let arrSrFirst = [...this.tagFilterFirstProperty];
      let resultArrayFirst = [];
      let resultArray = arraySr.map(item => {
        var rObj = {};
        rObj["id"] = item.idParentProperty;
        rObj["value"] = item.name;
        return rObj;
      });
      if (arrSrFirst.length > 0) {
        resultArrayFirst = arrSrFirst.map(item => {
          var rObj = {};
          rObj["id"] = item.idParentProperty;
          rObj["value"] = item.name;
          return rObj;
        });
      }

      this.arrFilters = [...resultArray, ...resultArrayFirst];
      // console.log(this.brandId)

      // let arr = this.categoryLevelSingles[this.active].property;
      // let arrySr =[]
      // if(Object.keys(this.selectedCheck).length > 0){
      //     for(var i = 0;i < Object.keys(this.selectedCheck).length;i++){
      //         let rs = Array.from(arr).find(e => e.id == Object.keys(this.selectedCheck)[i]);
      //         if(rs){
      //             let x = Object.assign(rs).value.find(p => p.id == Object.values(this.selectedCheck)[i]);
      //             arrySr.push({'id':Object.keys(this.selectedCheck)[i],'value':x.name})
      //         }
      //     }
      // }
      // this.arrFilters = arrySr;

      // console.log( Array.from(arr[]))

      // console.log(this.propertyFilter.value.find(e => e.id = this.selectedCheck.key),this.selectedCheck)
      // let query = {
      //     categoryId:this.categoryId,
      //     brand:this.brandId.join(),
      //     filter:this.selectedCheck,
      //     sortfield:this.sortField,
      //     sortype:this.sortType,
      //     currenpage:this.currenPage,
      //     pagesize:this.pageSize
      // }
      this.isLoadingCategory = true;
      if (this.$device.isDesktop) {
        setTimeout(() => {
          ProductService.postProductFilter(
            this.$axios,
            this.categoryId,
            this.brandId,
            this.isCombo,
            this.subCategoryId,
            this.subBrandId,
            this.arrFilters,
            this.sort.sortField,
            this.sort.sortType,
            this.pagination.currenPage,
            this.$device.isDesktop
              ? (this.pagination.pageSize = 40)
              : (this.pagination.pageSize = 20)
          ).then(resp => {
            this.productFilters = resp.data.data.products;
            this.totalPage = resp.data.data.total;
            this.isLoadingCategory = false;
            this.isLoadingProductMobile = false;
          });
        }, 1000);
      } else if (this.$device.isMobile) {
        setTimeout(() => {
          ProductService.postProductFilter(
            this.$axios,
            this.categoryId,
            this.brandId,
            this.isCombo,
            this.subCategoryId,
            this.subBrandId,
            this.arrFilters,
            this.sort.sortField,
            this.sort.sortType,
            this.pagination.currenPage,
            this.$device.isDesktop
              ? (this.pagination.pageSize = 40)
              : (this.pagination.pageSize = 20)
          ).then(resp => {
            this.productFilters = resp.data.data.products;
            this.totalPage = resp.data.data.total;
            this.isLoadingCategory = false;
            this.isLoadingProductMobile = false;
          });
        }, 1000);
      }
    }
  },
  layout: "default"
};
</script>
<style lang="scss" scoped>
.btnSearchReverse {
  border: solid 1px #00a896;
  background-color: #ffffff;
  color: #00a896;
  padding: 0.45rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #f2f2f2 !important;
    box-shadow: none !important;
    outline: none;
    color: #00a896 !important;
  }
}

.btnSearch {
  border: solid 1px #00a896;
  background-color: #00a896;
  color: #ffffff;
  padding: 0.45rem 1rem;
  &:hover,
  &:focus,
  &:active {
    background-color: #008073 !important;
    box-shadow: none !important;
    outline: none;
  }
}
.removeAll {
  display: inline-block;
  text-decoration: underline !important;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
}
.btnMoreRead {
  text-transform: uppercase;
  color: #999999;
  font-size: 13px;
  &:focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }
}
.tag {
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background-color: #e8e8e8;
  .remove {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 17px;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: 2px;
      background: #333;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
}
.boxCategoryBgColorActive {
  background-color: #ff599a !important;
  border-color: #ff599a;
}

.boxFiterLoading {
  pointer-events: none;
}

.boxFilterRightSelect {
  width: 210px;
  height: 40px;
  border: 1px solid #707070;
  &:focus {
    box-shadow: none;
  }

  &.custom-select {
    font-size: 0.9375rem;
    background: #fff url("../../assets/img/icon/arrowBottom.svg") no-repeat
      right 0.75rem center/10px 15px !important;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 8px;
  border: 6px solid #cb0055;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #cb0055 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 576px) {
  .boxCategoryFilter {
    .col-custom {
      flex: 0 0 45%;
      max-width: 45%;
    }
  }
  .btnSearchReverse {
    font-size: 0.875rem;
  }
  .btnSearch {
    font-size: 0.875rem;
  }
}
</style>

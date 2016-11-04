(in-package :mu-cl-resources)

(define-resource micro-service ()
  :class (s-prefix "mu:MicroService")
  :properties `((:title :string ,(s-prefix "dct:title"))
		(:description :string ,(s-prefix "dct:description"))
		(:documentation :string ,(s-prefix "mu:documentation"))
		(:docker-name :string ,(s-prefix "mu:dockerName"))
		(:image-location :string ,(s-prefix "mu:imageLocation"))
		(:configure-command :string ,(s-prefix "mu:command")))
  :has-many `((config-file :via ,(s-prefix "mu:hasConfigFile")
			   :as "config-files")
	      (endpoint :via ,(s-prefix "mu:hasEndpoint")
			:as "endpoints")
	      (version :via ,(s-prefix "mu:hasVersion")
		       :as "versions"))
  :resource-base (s-url "http://mu.semte.ch/store/microService")
  :on-path "micro-services")

(define-resource config-file ()
  :class (s-prefix "mu:ConfigFile")
  :properties `((:name :string ,(s-prefix "foaf:name"))
		(:location :string ,(s-prefix "mu:location"))
		(:type :string ,(s-prefix "mu:fileType")))
  :resource-base (s-url "http://mu.semte.ch/store/configFile")
  :on-path "config-files")

(define-resource endpoint ()
  :class (s-prefix "mu:Endpoint")
  :properties `((:location :string ,(s-prefix "mu:location"))
		(:description :string ,(s-prefix "dct:description")))
  :resource-base (s-url "http://mu.semte.ch/store/endpoint")
  :on-path "endpoints")

(define-resource version ()
  :class (s-prefix "mu:Version")
  :properties `((:name :string ,(s-prefix "foaf:name"))
		(:tag :string ,(s-prefix "mu:hasTag"))
		(:description :string ,(s-prefix "dct:description")))
  :resource-base (s-url "http://mu.semte.ch/store/version")
  :on-path "versions")

;;;;
;; NOTE
;; docker-compose stop; docker-compose rm; docker-compose up
;; after altering this file.

;; Describe your resources here

;; The general structure could be described like this:
;;
;; (define-resource <name-used-in-this-file> ()
;;   :class <class-of-resource-in-triplestore>
;;   :properties `((<json-property-name-one> <type-one> ,<triplestore-relation-one>)
;;                 (<json-property-name-two> <type-two> ,<triplestore-relation-two>>))
;;   :has-many `((<name-of-an-object> :via ,<triplestore-relation-to-objects>
;;                                    :as "<json-relation-property>")
;;               (<name-of-an-object> :via ,<triplestore-relation-from-objects>
;;                                    :inverse t ; follow relation in other direction
;;                                    :as "<json-relation-property>"))
;;   :has-one `((<name-of-an-object :via ,<triplestore-relation-to-object>
;;                                  :as "<json-relation-property>")
;;              (<name-of-an-object :via ,<triplestore-relation-from-object>
;;                                  :as "<json-relation-property>"))
;;   :resource-base (s-url "<string-to-which-uuid-will-be-appended-for-uri-of-new-items-in-triplestore>")
;;   :on-path "<url-path-on-which-this-resource-is-available>")


;; An example setup with a catalog, dataset, themes would be:
;;
;; (define-resource catalog ()
;;   :class (s-prefix "dcat:Catalog")
;;   :properties `((:title :string ,(s-prefix "dct:title")))
;;   :has-many `((dataset :via ,(s-prefix "dcat:dataset")
;;                        :as "datasets"))
;;   :resource-base (s-url "http://webcat.tmp.semte.ch/catalogs/")
;;   :on-path "catalogs")

;; (define-resource dataset ()
;;   :class (s-prefix "dcat:Dataset")
;;   :properties `((:title :string ,(s-prefix "dct:title"))
;;                 (:description :string ,(s-prefix "dct:description")))
;;   :has-one `((catalog :via ,(s-prefix "dcat:dataset")
;;                       :inverse t
;;                       :as "catalog"))
;;   :has-many `((theme :via ,(s-prefix "dcat:theme")
;;                      :as "themes"))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/datasets/")
;;   :on-path "datasets")

;; (define-resource distribution ()
;;   :class (s-prefix "dcat:Distribution")
;;   :properties `((:title :string ,(s-prefix "dct:title"))
;;                 (:access-url :url ,(s-prefix "dcat:accessURL")))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/distributions/")
;;   :on-path "distributions")

;; (define-resource theme ()
;;   :class (s-prefix "tfdcat:Theme")
;;   :properties `((:pref-label :string ,(s-prefix "skos:prefLabel")))
;;   :has-many `((dataset :via ,(s-prefix "dcat:theme")
;;                        :inverse t
;;                        :as "datasets"))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/themes/")
;;   :on-path "themes")

;;
